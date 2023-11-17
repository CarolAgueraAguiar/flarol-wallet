import {
  Button,
  Keyboard,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { useToast } from "react-native-toast-notifications";
import {
  TextField,
  TextFieldStatus,
} from "../../../components/TextFieldStatus/TextFieldStatus";
import { RadioButtonProps, RadioGroup } from "react-native-radio-buttons-group";
import { Picker } from "@react-native-picker/picker";
import MoneyInput from "../../../components/MoneyInput/MoneyInput";
import { GetCategoriesProps } from "../../../types/categories/categories";
import { ListWalletsProps } from "../../../types/wallets/wallets";
import { listCategory } from "../../../services/categories/categories";
import { listWallets } from "../../../services/wallets/wallets";
import { cleanNumber } from "../../../utils/mask";
import { TransactionStatus } from "../../../enum/TransactionStatus";
import { createTransaction } from "../../../services/transactions/transactions";
import { Calendar } from "react-native-calendars";
import { formatarData, formatarDataParaEnvio } from "../../../utils/Date";
import { FormErrors } from "../../Login/Login";

export const AddIncome = ({ navigation }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
  } = useForm();
  const toast = useToast();

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedRepeat, setSelectedRepeat] = useState(1);
  const [selectedRepeatName, setSelectedRepeatName] = useState("Diario");
  const [isRecived, setIsRecived] = useState(false);

  const [isRepeatOrSplit, setIsRepeatOrSplit] = useState(false);

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
    setIsRecived((previousState) => !previousState);
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
        color: "#1aae9f",
        borderColor: "#f4f3f4",
        labelStyle: { fontWeight: "600", color: "#000", fontSize: 16 },
        selected: true,
      },
      {
        id: "parcelar",
        label: "Parcelar valor",
        value: "parcelar",
        color: "#1aae9f",
        borderColor: "#f4f3f4",
        labelStyle: { fontWeight: "600", color: "#000", fontSize: 16 },
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
    clearErrors("date");
    closeCalendar();
  };

  useEffect(() => {
    setValue("date", formatarData(selectedDate));
  }, []);

  const getCategories = async () => {
    const data = await listCategory();
    if (data.length === 0) {
      toast.show("Não há categoria cadastrada", {
        type: "danger",
        duration: 3000,
      });

      setTimeout(function () {
        navigation.navigate("AdicionarCategoria");
      }, 3000);
      return;
    }
    setCategories(data);
    setValue("categoryId", data[0].id);
    setValue("categoryName", data[0].description);
  };

  const getWallets = async () => {
    const data = await listWallets();
    setWallets(data);
    setValue("walletId", data[0].id);
    setValue("walletName", data[0].description);
  };

  useEffect(() => {
    getCategories();
    getWallets();
  }, []);

  const onSubmit = async (data: any) => {
    const objectData = {
      amount: data.amount ? Number(cleanNumber(data.amount)) : 0,
      description: data.description || "",
      date: data.date ? formatarDataParaEnvio(data.date) : "",
      status: isRecived
        ? TransactionStatus.RECEIVED
        : TransactionStatus.NOT_RECEIVED,
      installment: data.repeat ? Number(data.repeat) : 1,
      period: selectedRepeat || 0,
      walletId: data.walletId || "",
      categoryId: data.categoryId || "",
    };

    const [storeData, error] = await createTransaction(objectData);

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

    if (storeData === 201) {
      toast.show("Transação criada com sucesso", {
        type: "success",
      });
      navigation.navigate("Home");
    } else {
      toast.show("Erro ao criar transação", {
        type: "danger",
      });
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <View>
          <Text style={{ color: "#000" }}>Digite o valor</Text>
          <MoneyInput control={control} name="amount" errors={errors} />
        </View>
        <View>
          <Text style={{ color: "#000" }}>Digite o descrição:</Text>
          <TextField
            status={TextFieldStatus.Default}
            control={control}
            name="description"
            placeholder="Descrição"
            errors={errors}
          />
        </View>
        <View>
          <Text style={{ color: "#000" }}>Selecione a data da receita:</Text>
          <TextField
            status={TextFieldStatus.Default}
            control={control}
            name="date"
            placeholder="Selecione a Data"
            errors={errors}
            onClick={openCalendar}
          />
        </View>
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
        <View>
          <Text style={{ color: "#000" }}>
            Selecione a categoria da receita:
          </Text>
          <TextField
            status={TextFieldStatus.Default}
            control={control}
            name="categoryName"
            placeholder="Categoria"
            errors={errors}
            onClick={openCategory}
          />
        </View>
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
        <View>
          <Text style={{ color: "#000" }}>Selecione a Carteira:</Text>
          <TextField
            status={TextFieldStatus.Default}
            control={control}
            name="walletName"
            placeholder="Carteira"
            errors={errors}
            onClick={openWallets}
          />
        </View>
        {isWalletVisible && (
          <Picker
            selectionColor={"#1aae9f9b"}
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
                color="#000"
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
              color: "#000",
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            Recebido ?
          </Text>
        </View>
        <View style={styles.switch}>
          <Switch
            trackColor={{ false: "#767577", true: "#1aae9f" }}
            thumbColor={isRepeatOrSplit ? "#fff" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchRepeatOrSplit}
            value={isRepeatOrSplit}
          />
          <Text
            style={{
              marginLeft: 10,
              color: "#000",
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
        </View>
      )}
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <View style={styles.buttonAdd}>
          <Text style={{ color: "#000", fontWeight: "600" }}>Criar</Text>
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
