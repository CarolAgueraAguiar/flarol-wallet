import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextField,
  TextFieldStatus,
} from "../../../components/TextFieldStatus/TextFieldStatus";
import { Calendar } from "react-native-calendars";
import MoneyInput from "../../../components/MoneyInput/MoneyInput";
import { RadioButtonProps, RadioGroup } from "react-native-radio-buttons-group";
import { Picker } from "@react-native-picker/picker";
import { GetCategoriesProps } from "../../../types/categories/categories";
import { ListWalletsProps } from "../../../types/wallets/wallets";
import { listCategory } from "../../../services/categories/categories";
import { listWallets } from "../../../services/wallets/wallets";
import {
  deleteTransaction,
  showTransaction,
  updateTransaction,
} from "../../../services/transactions/transactions";
import { cleanNumberNegative } from "../../../utils/mask";
import { TransactionStatus } from "../../../enum/TransactionStatus";
import { useToast } from "react-native-toast-notifications";
import {
  formatarDataTimeStamp,
  formatarDataParaEnvio,
  formatarData,
} from "../../../utils/Date";

export const UpdateExpenses = ({ navigation: { navigate }, route }: any) => {
  const { id, walletId } = route.params;
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const [selectedDate, setSelectedDate] = useState("");

  const getExpenses = async () => {
    const data = await showTransaction(id, walletId);
    setIsPaid(data.status === TransactionStatus.PAIED);
    setValue("description", data.description);
    setValue("amount", data.amount);
    setValue("categoryId", data.category_id);
    if (data.category) {
      setValue("categoryName", data.category.description);
    }
    setValue("walletId", data.wallet_id);
    setValue("walletName", data.wallet.description);
    setValue("date", formatarDataTimeStamp(data.date));
  };

  const handleDeleteCategory = async () => {
    Alert.alert("Tem certeza que quer excluir ?", "Absoluta ?", [
      {
        text: "Cancelar",
        onPress: () => ({}),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          deleteExpenses();
        },
      },
    ]);
  };

  const deleteExpenses = async () => {
    const dataRequest = {
      id: id,
      wallet_id: walletId,
    };

    const [data, error] = await deleteTransaction(dataRequest);

    if (data === 200) {
      toast.show("Despesa removida com sucesso", {
        type: "success",
      });
      navigate("Expenses");
    } else {
      toast.show(`Erro ao remover despesa (${error?.statusCode})`, {
        type: "danger",
      });
    }
  };

  const [isPaid, setIsPaid] = useState(false);
  const toast = useToast();

  const toggleSwitchReceived = () => {
    setIsPaid((previousState) => !previousState);
  };

  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  const [isCategoryVisible, setCategoryVisibility] = useState(false);
  const [isWalletVisible, setWalletVisibility] = useState(false);
  const [categories, setCategories] = useState<GetCategoriesProps[]>([]);
  const [wallets, setWallets] = useState<ListWalletsProps[]>([]);
  const [categoriesSelected, setCategoriesSelected] = useState("");
  const [walletSelected, setWalletSelected] = useState("");

  const openCalendar = () => {
    setCalendarVisibility(true);
  };

  const closeCalendar = () => {
    setCalendarVisibility(false);
  };

  const openCategory = () => {
    setCategoryVisibility((previousState) => !previousState);
  };

  const openWallets = () => {
    setWalletVisibility((previousState) => !previousState);
  };

  const handleDateChange = (day: any) => {
    setSelectedDate(day.dateString);
    setValue("date", formatarData(day.dateString));
    closeCalendar();
  };

  const getCategories = async () => {
    const data = await listCategory();
    setCategories(data);
  };

  const getWallets = async () => {
    const data = await listWallets();
    setWallets(data);
  };

  useEffect(() => {
    getCategories();
    getWallets();
    getExpenses();
  }, []);

  const onSubmit = async (data: any) => {
    const objectData = {
      id: id,
      walletIdOld: walletId,
      amount: -Number(cleanNumberNegative(data.amount)),
      description: data.description,
      date: formatarDataParaEnvio(data.date),
      status: isPaid ? TransactionStatus.PAIED : TransactionStatus.NOT_PAIED,
      walletId: data.walletId,
      categoryId: data.categoryId ? data.categoryId : null,
    };

    const storeData = await updateTransaction(objectData);
    if (storeData === 201) {
      toast.show("Despesa alterada com sucesso", {
        type: "success",
      });
      getExpenses();
      navigate("Expenses");
    } else {
      toast.show("Erro ao alterar transação", {
        type: "danger",
      });
    }
  };
  return (
    <ScrollView>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MoneyInput control={control} name="amount" />
        <TextField
          status={TextFieldStatus.Default}
          control={control}
          name="description"
          placeholder="Descrição"
          errors={errors}
        />
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
              borderColor: "#e07d8c",
              height: "auto",
              width: 328,
            }}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#b6c1cd",
              selectedDayBackgroundColor: "#e07d8c",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#e07d8c",
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
        {getValues("categoryName") && (
          <>
            <TextField
              status={TextFieldStatus.Disabled}
              control={control}
              name="categoryName"
              placeholder="Categoria"
              errors={errors}
              onClick={openCategory}
            />
            {isCategoryVisible && (
              <Picker
                selectedValue={categoriesSelected}
                style={
                  Platform.OS === "ios"
                    ? {
                        height: 200,
                        backgroundColor: "#fff",
                        width: 328,
                        borderRadius: 5,
                      }
                    : {
                        height: 110,
                        backgroundColor: "#fff",
                        width: 328,
                        borderRadius: 5,
                      }
                }
                onValueChange={(itemId) => {
                  const searchName = categories.find(
                    (icon: any) => icon.id === itemId
                  )!.description;
                  setValue("categoryId", itemId);
                  setValue("categoryName", searchName);
                  setCategoriesSelected(itemId);
                }}
              >
                {categories.map((option, index) => (
                  <Picker.Item
                    key={index}
                    label={option.description}
                    value={option.id}
                  />
                ))}
              </Picker>
            )}
          </>
        )}
        <TextField
          status={TextFieldStatus.Disabled}
          control={control}
          name="walletName"
          placeholder="Carteira"
          errors={errors}
          onClick={openWallets}
        />
        {isWalletVisible && (
          <Picker
            selectedValue={walletSelected}
            style={
              Platform.OS === "ios"
                ? {
                    height: 200,
                    backgroundColor: "#fff",
                    width: 328,
                    borderRadius: 5,
                  }
                : {
                    height: 110,
                    backgroundColor: "#fff",
                    width: 328,
                    borderRadius: 5,
                  }
            }
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
                key={index}
                label={option.description}
                value={option.id}
              />
            ))}
          </Picker>
        )}
        <View style={styles.switch}>
          <Switch
            trackColor={{ false: "#767577", true: "#e07d8c" }}
            thumbColor={isPaid ? "#fff" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchReceived}
            value={isPaid}
          />
          <Text
            style={{
              marginLeft: 10,
              color: "#f4f3f4",
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            Pago ?
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <View style={styles.buttonAdd}>
          <Text style={{ color: "#fff", fontWeight: "600" }}>Atualizar</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeleteCategory}>
        <View style={styles.buttonDelete}>
          <Text style={{ color: "#fff", fontWeight: "600" }}>Deletar</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  switch: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: 328,
    paddingBottom: 16,
    paddingTop: 16,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "700",
  },
  container: {
    borderRadius: 24,
    lineHeight: 1.25,
    padding: 24,
    margin: 12,
    height: 150,
    backgroundColor: "#bdc30fa2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonAdd: {
    borderRadius: 24,
    lineHeight: 1.25,
    margin: 12,
    height: 40,
    backgroundColor: "green",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDelete: {
    borderRadius: 24,
    lineHeight: 1.25,
    margin: 12,
    height: 40,
    backgroundColor: "red",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 30,
  },
});
