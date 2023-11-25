import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  showPiggyBank,
  storePiggyBank,
  transferPiggyBank,
  updatePiggyBank,
  withDrawPiggyBank,
} from "../../services/piggyBank/piggybank";
import { FormErrors } from "../Login/Login";
import { useForm } from "react-hook-form";
import { useToast } from "react-native-toast-notifications";
import MoneyInput from "../../components/MoneyInput/MoneyInput";
import {
  TextField,
  TextFieldStatus,
} from "../../components/TextFieldStatus/TextFieldStatus";
import { Calendar } from "react-native-calendars";
import {
  formatarData,
  formatarDataParaEnvio,
  formatarDataTimeStamp,
} from "../../utils/Date";
import { listWallets } from "../../services/wallets/wallets";
import { ListWalletsProps } from "../../types/wallets/wallets";
import { Picker } from "@react-native-picker/picker";
import { cleanNumber } from "../../utils/mask";
import { Add } from "../../../assets/svg/Add";
import { IconMinus } from "../../../assets/svg/IconMinus";

const UpdatePorquinhoScreen: React.FC = ({
  navigation: { navigate },
  route,
}: any) => {
  const { id } = route.params;

  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  const [isInputTransferVisible, setInputTransferVisibility] = useState(false);
  const [isWalletVisible, setWalletVisibility] = useState(false);
  const [isInputSaqueVisible, setInputSaqueVisibility] = useState(false);
  const [wallets, setWallets] = useState<ListWalletsProps[]>([]);
  const [walletSelected, setWalletSelected] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    getValues,
  } = useForm();

  const toast = useToast();

  const openCalendar = () => {
    setCalendarVisibility(true);
  };

  const closeCalendar = () => {
    setCalendarVisibility(false);
  };

  const handleDateChange = (day: any) => {
    setSelectedDate(day.dateString);
    setValue("date", formatarData(day.dateString));
    closeCalendar();
  };

  const listPiggys = async () => {
    const [piggyBanks, error] = await showPiggyBank(id);

    if (error) {
      toast.show(`Erro ao retornar o porquinho - (${error.statusCode})`, {
        type: "danger",
      });
      navigate("PiggyBank");
      return;
    }

    setValue("name", piggyBanks!.piggy.name);
    setValue("date", formatarDataTimeStamp(piggyBanks!.piggy.final_date));
    setValue("goal", piggyBanks!.piggy.final_amount);
  };

  useEffect(() => {
    listPiggys();
  }, []);

  useEffect(() => {
    setValue("date", formatarData(selectedDate));
  }, []);

  const getWallets = async () => {
    const data = await listWallets();
    setWallets(data);
    setWalletSelected(data[0].id.toString());
    setValue("walletId", data[0].id);
    setValue("walletName", data[0].description);
  };

  useEffect(() => {
    getWallets();
  }, []);

  const openInputDepositar = () => {
    setInputTransferVisibility(!isInputTransferVisible);
    setInputSaqueVisibility(false);
  };

  const openInputSaque = () => {
    setInputSaqueVisibility(!isInputSaqueVisible);
    setInputTransferVisibility(false);
  };

  const openWallets = () => {
    setWalletVisibility((previousState) => !previousState);
  };

  const updatePiggyAdd = async (data: any) => {
    const update = {
      piggy_id: id,
      wallet_id: Number(walletSelected),
      amount: Number(cleanNumber(getValues("amount"))),
    };

    const [transferPiggy, error] = await transferPiggyBank(update);

    if (error) {
      const errorObject: FormErrors = {};

      error.message.forEach((errorItem) => {
        return (errorObject[errorItem.field] = {
          message: errorItem.error,
          type: "required",
        });
      });

      Object.keys(errorObject).forEach((field) => {
        setError(field, errorObject[field]);
      });
      return;
    }

    if (transferPiggy === 201) {
      toast.show("Transferência realizada com sucesso", {
        type: "success",
      });
      navigate("PiggyBank");
    }
  };

  const updatePiggyRemove = async () => {
    const update = {
      piggy_id: id,
      wallet_id: Number(walletSelected),
      amount: Number(cleanNumber(getValues("amountSaque"))),
    };

    const [transferPiggy, error] = await withDrawPiggyBank(update);

    if (error) {
      const errorObject: FormErrors = {};

      error.message.forEach((errorItem) => {
        return (errorObject[errorItem.field] = {
          message: errorItem.error,
          type: "required",
        });
      });

      Object.keys(errorObject).forEach((field) => {
        setError(field, errorObject[field]);
      });
      return;
    }

    if (transferPiggy === 201) {
      toast.show("Saque realizado com sucesso", {
        type: "success",
      });
      navigate("PiggyBank");
    }
  };

  const onSubmit = async (data: any) => {
    const newPiggyBank = {
      id: id,
      name: data.name,
      final_date: data.date ? formatarDataParaEnvio(data.date) : "",
      final_amount: data.goal ? Number(cleanNumber(data.goal)) : 0,
    };

    const [storePiggy, error] = await updatePiggyBank(newPiggyBank);

    if (error) {
      const errorObject: FormErrors = {};

      error.message.forEach((errorItem) => {
        return (errorObject[errorItem.field] = {
          message: errorItem.error,
          type: "required",
        });
      });

      Object.keys(errorObject).forEach((field) => {
        setError(field, errorObject[field]);
      });
      return;
    }

    if (storePiggy === 201) {
      toast.show("Porquinho criado com sucesso", {
        type: "success",
      });
      navigate("Home");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {!isInputTransferVisible && !isInputSaqueVisible && (
          <View>
            <View>
              <Text style={{ margin: 8 }}>Nome:</Text>
              <TextField
                status={TextFieldStatus.Default}
                control={control}
                name="name"
                placeholder="Digite o nome do porquinho"
                errors={errors}
              />
            </View>
            <View>
              <Text style={{ margin: 8 }}>Objetivo:</Text>
              <MoneyInput control={control} name="goal" errors={errors} />
            </View>
            <View>
              <Text style={{ margin: 8 }}>Selecione a data final:</Text>
              <TextField
                status={TextFieldStatus.Disabled}
                control={control}
                name="date"
                placeholder="Selecione a Data"
                errors={errors}
                onClick={openCalendar}
              />
              {isCalendarVisible && (
                <Calendar
                  displayName="date"
                  style={{
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: "#1aa035",
                    height: "auto",
                    width: 328,
                    marginLeft: 8,
                  }}
                  theme={{
                    backgroundColor: "#ffffff",
                    calendarBackground: "#ffffff",
                    textSectionTitleColor: "#b6c1cd",
                    selectedDayBackgroundColor: "#1aa035",
                    selectedDayTextColor: "#ffffff",
                    todayTextColor: "#1aa035",
                    dayTextColor: "#2d4150",
                  }}
                  current={selectedDate}
                  onDayPress={handleDateChange}
                  markedDates={{
                    [selectedDate]: {
                      selected: true,
                      disableTouchEvent: true,
                    },
                  }}
                />
              )}
            </View>
          </View>
        )}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={openInputSaque}
            style={{ display: "flex", alignItems: "center", margin: 12 }}
          >
            <View style={styles.buttonMinusMoney}>
              <IconMinus />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openInputDepositar}
            style={{ display: "flex", alignItems: "center", margin: 12 }}
          >
            <View style={styles.buttonAddMoney}>
              <Add />
            </View>
          </TouchableOpacity>
        </View>
        {isInputTransferVisible && (
          <View>
            <Text style={{ margin: 8 }}>
              Digite o valor desejado para DEPOSITAR:
            </Text>
            <MoneyInput control={control} name="amount" errors={errors} />
            <View>
              <Text style={{ margin: 8 }}>Selecione a Carteira:</Text>
              <TextField
                status={TextFieldStatus.Disabled}
                control={control}
                name="walletName"
                placeholder="Carteira"
                errors={errors}
                onClick={openWallets}
              />
            </View>
            {isWalletVisible && (
              <Picker
                selectionColor="#1aa0359c"
                selectedValue={walletSelected}
                style={{
                  height: 200,
                  backgroundColor: "#fff",
                  width: 328,
                  borderRadius: 5,
                  marginLeft: 8,
                  marginBottom: 20,
                }}
                onValueChange={(itemId) => {
                  const searchName = wallets.find(
                    (icon: any) => icon.id === itemId
                  )!.description;
                  setValue("walletId", itemId);
                  setValue("walletName", searchName);
                  setWalletSelected(itemId);
                }}
              >
                {wallets.map((option, index) => (
                  <Picker.Item
                    color="#000"
                    key={index}
                    label={option.description}
                    value={option.id}
                  />
                ))}
              </Picker>
            )}
            <TouchableOpacity
              onPress={updatePiggyAdd}
              style={{ display: "flex", alignItems: "center", margin: 12 }}
            >
              <View style={styles.buttonAddMoneyFinished}>
                <Add />
                <Text style={{ color: "#fff", fontWeight: "700" }}>
                  Adicionar Dinheiro
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {isInputSaqueVisible && (
          <View>
            <Text style={{ margin: 8 }}>
              Digite o valor desejado para SAQUE:
            </Text>
            <MoneyInput control={control} name="amountSaque" errors={errors} />
            <View>
              <Text style={{ margin: 8 }}>Selecione a Carteira:</Text>
              <TextField
                status={TextFieldStatus.Disabled}
                control={control}
                name="walletName"
                placeholder="Carteira"
                errors={errors}
                onClick={openWallets}
              />
            </View>
            {isWalletVisible && (
              <Picker
                selectionColor="#1aa0359c"
                selectedValue={walletSelected}
                style={{
                  height: 200,
                  backgroundColor: "#fff",
                  width: 328,
                  borderRadius: 5,
                  marginLeft: 8,
                  marginBottom: 20,
                }}
                onValueChange={(itemId) => {
                  const searchName = wallets.find(
                    (icon: any) => icon.id === itemId
                  )!.description;
                  setValue("walletId", itemId);
                  setValue("walletName", searchName);
                  setWalletSelected(itemId);
                }}
              >
                {wallets.map((option, index) => (
                  <Picker.Item
                    color="#000"
                    key={index}
                    label={option.description}
                    value={option.id}
                  />
                ))}
              </Picker>
            )}
            <TouchableOpacity
              onPress={updatePiggyRemove}
              style={{ display: "flex", alignItems: "center", margin: 12 }}
            >
              <View style={styles.buttonRemoveMoneyFinished}>
                <IconMinus />
                <Text style={{ color: "#fff", fontWeight: "700" }}>
                  Sacar Dinheiro
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {!isInputTransferVisible && !isInputSaqueVisible && (
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.buttonAdd}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>Salvar</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: "space-between",
    marginBottom: 50,
    marginTop: 20,
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 10,
    marginTop: 5,
  },
  buttonAdd: {
    borderRadius: 10,
    paddingVertical: 15,
    backgroundColor: "#5577A5",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonAddMoney: {
    borderRadius: 100,
    height: 60,
    width: 60,
    backgroundColor: "green",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",

    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#fff",
    borderTopColor: "white",
  },
  buttonAddMoneyFinished: {
    borderRadius: 100,
    height: 60,
    width: 200,
    backgroundColor: "green",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  buttonRemoveMoneyFinished: {
    borderRadius: 100,
    height: 60,
    width: 200,
    backgroundColor: "red",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  buttonMinusMoney: {
    borderRadius: 100,
    height: 60,
    width: 60,
    backgroundColor: "red",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",

    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: "#fff",
    borderTopColor: "white",
  },
});

export default UpdatePorquinhoScreen;
