import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  TextField,
  TextFieldStatus,
} from "../../components/TextFieldStatus/TextFieldStatus";
import { useForm } from "react-hook-form";
import { storeWallets } from "../../services/wallets/wallets";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import MoneyInput from "../../components/MoneyInput/MoneyInput";
import { TextInputMask } from "react-native-masked-text";
import { cleanNumber } from "../../utils/mask";

export const AddWallet = ({ navigation: { navigate } }: any) => {
  const { control, handleSubmit, setValue } = useForm();
  const { user } = useContext(UserContext);

  const onSubmit = async (data: any) => {
    data.amount = cleanNumber(data.amount);
    await storeWallets(data);
    navigate("Carteira");
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>Adicionar Carteira</Text>
      </View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          status={TextFieldStatus.Active}
          control={control}
          name="userId"
          inputMode="none"
          defaltValue={`${user.id}`}
        />
        <TextField
          status={TextFieldStatus.Default}
          control={control}
          name="description"
          placeholder="Digite o nome da carteira"
        />
        <MoneyInput control={control} name="amount" />
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <View style={styles.buttonAdd}>
          <Text>Criar</Text>
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
    backgroundColor: "#81B2CA",
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
