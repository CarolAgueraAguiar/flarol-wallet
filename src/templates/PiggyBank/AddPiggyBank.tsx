import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { storePiggyBank } from "../../services/piggyBank/piggybank";
import { FormErrors } from "../Login/Login";
import { useForm } from "react-hook-form";
import { useToast } from "react-native-toast-notifications";
import MoneyInput from "../../components/MoneyInput/MoneyInput";
import {
  TextField,
  TextFieldStatus,
} from "../../components/TextFieldStatus/TextFieldStatus";
import { Calendar } from "react-native-calendars";
import { formatarData, formatarDataParaEnvio } from "../../utils/Date";
import { listWallets } from "../../services/wallets/wallets";
import { ListWalletsProps } from "../../types/wallets/wallets";
import { Picker } from "@react-native-picker/picker";
import { cleanNumber } from "../../utils/mask";

const AdicionarPorquinhoScreen: React.FC = ({ navigation }: any) => {
  const [current, setCurrent] = useState("");
  const [goal, setGoal] = useState("");
  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  const [isWalletVisible, setWalletVisibility] = useState(false);
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
  } = useForm();

  const toast = useToast();

  const openCalendar = () => {
    setCalendarVisibility(true);
  };

  const closeCalendar = () => {
    setCalendarVisibility(false);
  };

  const openWallets = () => {
    setWalletVisibility((previousState) => !previousState);
  };

  const handleDateChange = (day: any) => {
    setSelectedDate(day.dateString);
    setValue("date", formatarData(day.dateString));
    closeCalendar();
  };

  useEffect(() => {
    setValue("date", formatarData(selectedDate));
  }, []);

  const getWallets = async () => {
    const data = await listWallets();
    setWallets(data);
    setValue("walletId", data[0].id);
    setValue("walletName", data[0].description);
  };

  useEffect(() => {
    getWallets();
  }, []);

  const onSubmit = async (data: any) => {
    const newPiggyBank = {
      name: data.name,
      final_date: data.date ? formatarDataParaEnvio(data.date) : "",
      initial_value: data.current ? Number(cleanNumber(data.current)) : 0,
      final_amount: data.goal ? Number(cleanNumber(data.goal)) : 0,
      wallet_id: data.walletId,
    };

    const [storePiggy, error] = await storePiggyBank(newPiggyBank);

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
      navigation.navigate("Home");
    } else {
      toast.show("Erro ao criar porquinho", {
        type: "danger",
      });
    }
    navigation.navigate("Home");
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      style={styles.container}
    >
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
        <Text style={{ margin: 8 }}>Valor Inicial:</Text>
        <MoneyInput control={control} name="current" errors={errors} />
      </View>
      <View>
        <Text style={{ margin: 8 }}>Objetivo:</Text>
        <MoneyInput control={control} name="goal" errors={errors} />
      </View>
      <View>
        <Text style={{ margin: 8 }}>Selecione a data da despesa:</Text>
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
        onPress={handleSubmit(onSubmit)}
        style={styles.buttonAdd}
      >
        <Text style={{ color: "#fff", fontWeight: "700" }}>Adicionar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    height: "100%",
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
  },
});

export default AdicionarPorquinhoScreen;
