import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  TextField,
  TextFieldStatus,
} from "../../components/TextFieldStatus/TextFieldStatus";
import { useForm } from "react-hook-form";
import { showWallet, updateWallets } from "../../services/wallets/wallets";
import { useEffect } from "react";
import MoneyInput from "../../components/MoneyInput/MoneyInput";
import { cleanNumber } from "../../utils/mask";

export const UpdateWallet = ({ navigation: { navigate }, route }: any) => {
  const { id } = route.params;
  const { control, setValue, handleSubmit } = useForm();

  const getWallets = async (id: number) => {
    const walletData = await showWallet(id);
    setValue("description", walletData.description);
    setValue("amount", walletData.amount);
  };

  useEffect(() => {
    getWallets(id);
  }, []);

  const onSubmit = async (data: any) => {
    data.amount = cleanNumber(data.amount);
    data.id = id;
    await updateWallets(data);
    navigate("Carteira");
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>Atualizar Carteira</Text>
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
    backgroundColor: "#cabd81",
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
