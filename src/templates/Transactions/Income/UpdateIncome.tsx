import {
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
import { cleanNumber } from "../../../utils/mask";
import { TransactionStatus } from "../../../enum/TransactionStatus";
import { useToast } from "react-native-toast-notifications";
import {
  formatarDataTimeStamp,
  formatarDataParaEnvio,
  formatarData,
} from "../../../utils/Date";

export const UpdateIncome = ({ navigation: { navigate }, route }: any) => {
  const { id, walletId } = route.params;
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const [selectedDate, setSelectedDate] = useState("");

  const getIncome = async () => {
    const data = await showTransaction(id, walletId);

    setIsRecived(data.status === TransactionStatus.RECEIVED);
    setValue("description", data.description);
    setValue("amount", data.amount);
    setValue("categoryId", data.category_id);
    setValue("categoryName", data.category.description);
    setValue("walletId", data.wallet_id);
    setValue("walletName", data.wallet.description);
    setValue("date", formatarDataTimeStamp(data.date));
  };

  const deleteExpenses = async () => {
    const dataRequest = {
      id: id,
      wallet_id: walletId,
    };

    const [data, error] = await deleteTransaction(dataRequest);

    if (data === 200) {
      toast.show("Receita removida com sucesso", {
        type: "success",
      });
      navigate("Incomes");
    } else {
      toast.show(`Erro ao remover Receita (${error?.statusCode})`, {
        type: "danger",
      });
    }
  };

  useEffect(() => {
    getIncome();
  }, []);

  const [isRecived, setIsRecived] = useState(false);
  const toast = useToast();

  const toggleSwitchReceived = () => {
    setIsRecived((previousState) => !previousState);
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
  }, []);

  const onSubmit = async (data: any) => {
    const objectData = {
      id: id,
      walletIdOld: walletId,
      amount: cleanNumber(data.amount),
      description: data.description,
      date: formatarDataParaEnvio(data.date),
      status: isRecived
        ? TransactionStatus.RECEIVED
        : TransactionStatus.NOT_RECEIVED,
      walletId: data.walletId,
      categoryId: data.categoryId,
    };

    const storeData = await updateTransaction(objectData);
    if (storeData === 201) {
      toast.show("Receita alterada com sucesso", {
        type: "success",
      });
      navigate("Home");
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
        <MoneyInput control={control} name="amount" errors={errors} />
        <TextField
          status={TextFieldStatus.Default}
          control={control}
          name="description"
          placeholder="Descrição"
          errors={errors}
        />
        <TextField
          status={TextFieldStatus.Default}
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
              borderColor: "#1aae9f",
              height: "auto",
              width: 328,
            }}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#b6c1cd",
              selectedDayBackgroundColor: "#1aae9f",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#1aae9f",
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
        <TextField
          status={TextFieldStatus.Default}
          control={control}
          name="categoryName"
          placeholder="Categoria"
          errors={errors}
          onClick={openCategory}
        />
        {isCategoryVisible && (
          <Picker
            selectedValue={categoriesSelected}
            style={{
              height: 200,
              backgroundColor: "#fff",
              width: 328,
              borderRadius: 5,
            }}
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
        <TextField
          status={TextFieldStatus.Default}
          control={control}
          name="walletName"
          placeholder="Carteira"
          errors={errors}
          onClick={openWallets}
        />
        {isWalletVisible && (
          <Picker
            selectedValue={walletSelected}
            style={{
              height: 200,
              backgroundColor: "#fff",
              width: 328,
              borderRadius: 5,
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
                key={index}
                label={option.description}
                value={option.id}
              />
            ))}
          </Picker>
        )}

        <View style={styles.switch}>
          <Switch
            trackColor={{ false: "#767577", true: "#1aae9f" }}
            thumbColor={isRecived ? "#fff" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchReceived}
            value={isRecived}
          />
          <Text
            style={{
              marginLeft: 10,
              color: "#f4f3f4",
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            Recebido ?
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <View style={styles.buttonAdd}>
          <Text style={{ color: "#fff", fontWeight: "600" }}>Criar</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteExpenses}>
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
  text: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 30,
  },
});
