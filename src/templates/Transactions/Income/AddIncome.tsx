import {
  Button,
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

export const AddIncome = ({ navigation }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const toast = useToast();

  const [selectedRepeat, setSelectedRepeat] = useState<any>([
    {
      description: "Diário",
    },
    {
      description: "Semanal",
    },
    {
      description: "Mensal",
    },
    {
      description: "Anual",
    },
    {
      description: "Bimestral",
    },
    {
      description: "Trimestral",
    },
    {
      description: "Semestral",
    },
    {
      description: "A cada 2 semanas",
    },
  ]);
  const [isReceived, setIsReceived] = useState(false);
  const [isRepeatOrSplit, setIsRepeatOrSplit] = useState(false);
  const toggleSwitchReceived = () => {
    setIsReceived((previousState) => !previousState);
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
        labelStyle: { fontWeight: "600", color: "#f4f3f4", fontSize: 16 },
        selected: true,
      },
      {
        id: "parcelar",
        label: "Parcelar valor",
        value: "parcelar",
        color: "#1aae9f",
        borderColor: "#f4f3f4",
        labelStyle: { fontWeight: "600", color: "#f4f3f4", fontSize: 16 },
        selected: false,
      },
    ],
    []
  );

  const [selectedId, setSelectedId] = useState<string | undefined>();

  const getIcons = async () => {
    // const response = await listIcons();
    // const firstIconData = response?.[0]?.data;
    // const firstIconId = response?.[0]?.id;
    // setSelectedIcon(firstIconId);
    // setSelectedIconData(firstIconData);
    // setIcons(response);
  };

  useEffect(() => {
    getIcons();
  }, []);

  const onSubmit = async (data: any) => {};

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
          placeholder="Sáb., 16 set. 2023"
          errors={errors}
        />
        <TextField
          status={TextFieldStatus.Default}
          control={control}
          name="category"
          placeholder="Categoria"
          errors={errors}
        />
        <TextField
          status={TextFieldStatus.Default}
          control={control}
          name="wallet"
          placeholder="Carteira"
          errors={errors}
        />
        <View style={styles.switch}>
          <Switch
            trackColor={{ false: "#767577", true: "#1aae9f" }}
            thumbColor={isReceived ? "#fff" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitchReceived}
            value={isReceived}
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
              color: "#f4f3f4",
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            Repetir ou parcelar ?
          </Text>
        </View>
      </View>
      <View>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={setSelectedId}
          selectedId={selectedId}
          layout="row"
          containerStyle={{
            paddingBottom: 16,
            paddingTop: 16,
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
                height: 100,
                backgroundColor: "#fff",
                width: 265,
                borderRadius: 5,
                marginRight: 10,
              }}
              onValueChange={(itemValue) => {
                setSelectedRepeat(itemValue);
              }}
            >
              {selectedRepeat.map((icon: any, index: number) => (
                <Picker.Item
                  key={index}
                  label={icon.desription}
                  value={icon.description}
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
                height: 100,
                backgroundColor: "#fff",
                width: 265,
                borderRadius: 5,
                marginRight: 10,
              }}
              onValueChange={(itemValue) => {
                setSelectedRepeat(itemValue);
              }}
            >
              {selectedRepeat.map((icon: any, index: number) => (
                <Picker.Item
                  key={index}
                  label={icon.desription}
                  value={icon.description}
                />
              ))}
            </Picker>
          </View>
        )}
      </View>
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
