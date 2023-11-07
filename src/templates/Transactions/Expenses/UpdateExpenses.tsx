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

export const UpdateExpenses = ({ navigation: { navigate }, route }: any) => {
  const { id } = route.params;
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [selectedDate, setSelectedDate] = useState("");

  const getExpenses = async (id: number) => {
    const data = await showTransaction(id);
    setValue("description", data.description);
    setValue("amount", data.amount);
    setValue("categoryId", data.category_id);
    setValue("walletId", data.wallet_id);
    setValue("date", formatarDataTimeStamp(data.date));
  };

  useEffect(() => {
    getExpenses(id);
  }, []);

  const [selectedRepeat, setSelectedRepeat] = useState(1);
  const [selectedRepeatName, setSelectedRepeatName] = useState("Diario");
  const [isPaid, setIsPaid] = useState(false);
  const [isRepeatOrSplit, setIsRepeatOrSplit] = useState(false);
  const toast = useToast();

  const repeatOptions = [
    { nome: "Diário", dias: 1 },
    { nome: "Semanal", dias: 7 },
    { nome: "Mensal", dias: 30 },
    { nome: "Anual", dias: 365 },
    { nome: "Bimestral", dias: 60 },
    { nome: "Trimestral", dias: 90 },
    { nome: "Semestral", dias: 180 },
    { nome: "A cada 2 semanas", dias: 14 },
  ];
  const toggleSwitchReceived = () => {
    setIsPaid((previousState) => !previousState);
  };
  const toggleSwitchRepeatOrSplit = () => {
    setIsRepeatOrSplit((previousState) => !previousState);
  };

  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: "fixo",
        label: "Valor fixo",
        value: "fixo",
        color: "#e07d8c",
        borderColor: "#f4f3f4",
        labelStyle: { fontWeight: "600", color: "#f4f3f4", fontSize: 16 },
        selected: true,
      },
      {
        id: "parcelar",
        label: "Parcelar valor",
        value: "parcelar",
        color: "#e07d8c",
        borderColor: "#f4f3f4",
        labelStyle: { fontWeight: "600", color: "#f4f3f4", fontSize: 16 },
        selected: false,
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState<string | undefined>("fixo");

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
      amount: -Number(cleanNumber(data.amount)),
      description: data.description,
      date: formatarDataParaEnvio(data.date),
      status: isPaid ? TransactionStatus.PAIED : TransactionStatus.NOT_PAIED,
      installment: data.repeat ? Number(data.repeat) : 1,
      period: selectedRepeat,
      walletId: data.walletId,
      categoryId: data.categoryId,
    };

    const storeData = await updateTransaction(objectData);
    if (storeData === 201) {
      toast.show("Transação alterada com sucesso", {
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
        <MoneyInput control={control} name="amount" />
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
        <View style={styles.switch}>
          <Switch
            trackColor={{ false: "#767577", true: "#e07d8c" }}
            thumbColor={isRepeatOrSplit ? "#fff" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchRepeatOrSplit}
            value={isRepeatOrSplit}
          />
          <Text
            style={{
              marginLeft: 10,
              color: "#f4f3f4",
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            Repetir ou parcelar ?
          </Text>
        </View>
      </View>
      {isRepeatOrSplit && (
        <View>
          <RadioGroup
            radioButtons={radioButtons}
            onPress={setSelectedId}
            selectedId={selectedId}
            accessibilityLabel="Valor Fixo ou Parcelar"
            layout="row"
            containerStyle={{
              paddingBottom: 16,
              paddingTop: 16,
              paddingLeft: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          />
          {selectedId === "fixo" && (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                status={TextFieldStatus.Default}
                control={control}
                name="repeat"
                placeholder="Repetir"
                errors={errors}
              />
              <Picker
                selectedValue={selectedRepeat}
                style={{
                  height: 200,
                  backgroundColor: "#fff",
                  width: 328,
                  borderRadius: 5,
                }}
                onValueChange={(itemValue) => {
                  const searchName = repeatOptions.find(
                    (option: any) => option.dias === itemValue
                  )!.nome;
                  setSelectedRepeat(itemValue);
                  setSelectedRepeatName(searchName);
                }}
              >
                {repeatOptions.map((option, index) => (
                  <Picker.Item
                    key={index}
                    label={option.nome}
                    value={option.dias}
                  />
                ))}
              </Picker>
            </View>
          )}
          {selectedId === "parcelar" && (
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TextField
                status={TextFieldStatus.Default}
                control={control}
                name="split"
                placeholder="Parcelar em"
                errors={errors}
              />
              <Picker
                selectedValue={selectedRepeat}
                style={{
                  height: 200,
                  backgroundColor: "#fff",
                  width: 328,
                  borderRadius: 5,
                }}
                onValueChange={(itemValue) => {
                  const searchName = repeatOptions.find(
                    (icon: any) => icon.id === itemValue
                  )!.nome;
                  setSelectedRepeat(itemValue);
                  setSelectedRepeatName(searchName);
                }}
              >
                {repeatOptions.map((option, index) => (
                  <Picker.Item
                    key={index}
                    label={option.nome}
                    value={option.dias}
                  />
                ))}
              </Picker>
            </View>
          )}
        </View>
      )}
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <View style={styles.buttonAdd}>
          <Text style={{ color: "#fff", fontWeight: "600" }}>Criar</Text>
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
  text: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 30,
  },
});
