import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  TextField,
  TextFieldStatus,
} from "../../components/TextFieldStatus/TextFieldStatus";
import { useForm } from "react-hook-form";
import { storeWallets } from "../../services/wallets/wallets";
import MoneyInput from "../../components/MoneyInput/MoneyInput";
import { cleanNumber } from "../../utils/mask";
import { Decoration } from "../../../assets/svg/Decoration";
import { CircleIcon } from "../../../assets/svg/CircleIcon";

export const AddWallet = ({ navigation: { navigate } }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    data.amount = cleanNumber(data.amount);
    await storeWallets(data);
    navigate("Carteira");
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>Carteira</Text>
        <View style={{ position: "absolute", top: 0, right: 0 }}>
          <Decoration />
        </View>
        <View style={{ position: "absolute", bottom: 0, left: 0 }}>
          <CircleIcon />
        </View>
      </View>
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
          name="description"
          placeholder="Digite o nome da carteira"
          errors={errors}
        />
        <MoneyInput control={control} name="amount" />
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <View style={styles.buttonAdd}>
          <Text style={{ color: "#fff", fontWeight: "600" }}>Criar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
    backgroundColor: "#242424",
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
