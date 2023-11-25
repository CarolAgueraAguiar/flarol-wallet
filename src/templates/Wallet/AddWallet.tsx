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
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { FormErrors } from "../Login/Login";
import { useToast } from "react-native-toast-notifications";

export const AddWallet = ({ navigation: { navigate } }: any) => {
  const { user, setUser } = useContext(UserContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const toast = useToast();

  const onSubmit = async (data: any) => {
    const storeData = {
      amount: data.amount ? cleanNumber(data.amount) : 0,
      description: data.description ? data.description : "",
    };

    const [status, error] = await storeWallets(storeData);

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
    if (status === 201) {
      toast.show("Carteira criada com sucesso", {
        type: "success",
      });
      setUser({ ...user, hasWallet: true });
      navigate("Carteira");
    } else {
      toast.show("Erro ao criar carteira", {
        type: "danger",
      });
    }
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
        <MoneyInput control={control} name="amount" errors={errors} />
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
