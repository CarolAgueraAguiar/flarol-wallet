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
import { theme } from "../../styles/theme";
import { Logo } from "../../components/Logo/Logo";
import { useForm } from "react-hook-form";
import { storeUsers } from "../../services/users/users";
import { useToast } from "react-native-toast-notifications";
import { FormErrors } from "../Login/Login";

export const SignUp = ({ navigation }: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm();
  const toast = useToast();

  const onSubmit = async (data: any) => {
    const [status, error] = await storeUsers(data);

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

    if (status) {
      toast.show("Cadastro realizado com sucesso!", {
        type: "success",
      });
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.containerTwo}>
        <TextField
          status={TextFieldStatus.Active}
          placeholder="Digite seu nome"
          control={control}
          name="name"
          errors={errors}
        />
        <TextField
          status={TextFieldStatus.Active}
          placeholder="Digite sua E-mail"
          control={control}
          name="email"
          errors={errors}
        />
        <TextField
          status={TextFieldStatus.Active}
          placeholder="Digite sua Senha"
          control={control}
          name="password"
          errors={errors}
        />
        <TextField
          status={TextFieldStatus.Active}
          placeholder="Digite sua Senha novamente"
          control={control}
          name="confirm_password"
          errors={errors}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "600",
          }}
        >
          Cadastrar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 120,
    borderRadius: 15,
    margin: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    borderStyle: "dashed",
    borderWidth: 1.5,
    borderColor: "#fff",
    borderTopColor: "white",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerTwo: {
    marginTop: 50,
    marginBottom: 50,
  },
});
