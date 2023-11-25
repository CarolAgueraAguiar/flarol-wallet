import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  TextField,
  TextFieldStatus,
} from "../../components/TextFieldStatus/TextFieldStatus";
import { useForm } from "react-hook-form";
import {
  deleteWallet,
  showWallet,
  updateWallets,
} from "../../services/wallets/wallets";
import { useEffect } from "react";
import MoneyInput from "../../components/MoneyInput/MoneyInput";
import { cleanNumber } from "../../utils/mask";
import { Decoration } from "../../../assets/svg/Decoration";
import { CircleIcon } from "../../../assets/svg/CircleIcon";

export const UpdateWallet = ({ navigation: { navigate }, route }: any) => {
  const { id } = route.params;
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getWallets = async (id: number) => {
    const walletData = await showWallet(id);
    setValue("description", walletData.description);
    setValue("amount", walletData.amount);
  };

  useEffect(() => {
    getWallets(id);
  }, []);

  const deleteWalletAsync = async (id: number) => {
    await deleteWallet(id);
    getWallets(id);
    navigate("Carteira");
  };

  const handleDeleteWallet = async (id: number) => {
    Alert.alert("Tem certeza que quer excluir ?", "Absoluta ?", [
      {
        text: "Cancelar",
        onPress: () => ({}),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          deleteWalletAsync(id);
        },
      },
    ]);
  };

  const onSubmit = async (data: any) => {
    if (data.amount) {
      data.amount = cleanNumber(data.amount);
    }
    data.id = id;
    await updateWallets(data);
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
          <Text style={{ color: "#fff", fontWeight: "600" }}>Atualizar</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          handleDeleteWallet(id);
        }}
      >
        <View style={styles.buttonDelete}>
          <Text style={{ color: "#fff", fontWeight: "600" }}>Excluir</Text>
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
    position: "relative",
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
  buttonDelete: {
    borderRadius: 24,
    lineHeight: 1.25,
    margin: 12,
    height: 40,
    backgroundColor: "red",
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
