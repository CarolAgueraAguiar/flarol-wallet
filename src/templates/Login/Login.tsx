import { LogBox, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../styles/theme";
import {
  TextField,
  TextFieldStatus,
} from "../../components/TextFieldStatus/TextFieldStatus";
import { Logo } from "../../components/Logo/Logo";
import { useForm } from "react-hook-form";
import { login } from "../../services/users/users";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { saveSessionToken } from "../../utils/token";

export interface FormErrors {
  [key: string]: {
    message: string;
    type: string;
  };
}

export const Login = ({ navigation }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const context = useContext(UserContext);

  useEffect(() => {
    LogBox.ignoreLogs([
      "Sending `onAnimatedValueUpdate` with no listeners registered.",
    ]);
  }, []);
  const onSubmit = async (data: any) => {
    const [loginData, error] = await login(data);

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

    if (loginData) {
      context?.setUser(loginData);
      saveSessionToken(loginData.token);
    }
  };

  useEffect(() => {
    //NOTE - SOMENTE PARA DESENVOLVIMENTO, PARA NÃO PRECISAR LOGAR TODA VEZ
    const userData = {
      name: "Carolina Aguera",
      email: "carol@gmail.com",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzAxMjExMzQzLCJleHAiOjE3MDM4MDMzNDN9.zhHqXlNrGbyLNp0C1B2AThF7uc4mswHmQFHek_KeqKw",
      hasWallet: true,
    };
    context.setUser(userData);
    saveSessionToken(userData.token);
  }, []);

  return (
    <View style={styles.containerLogin}>
      <Logo />
      <View style={styles.containerTwo}>
        <TextField
          control={control}
          name="email"
          status={TextFieldStatus.Active}
          placeholder="Digite seu E-mail"
          errors={errors}
        />
        <TextField
          control={control}
          name="password"
          status={TextFieldStatus.Active}
          placeholder="Digite sua Senha"
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
          Entrar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 100,
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
  containerLogin: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerTwo: {
    marginTop: 50,
    marginBottom: 50,
  },
  text: {
    color: theme.colorsSecondary.gray[100],
    fontSize: 26,
    textAlign: "center",
    lineHeight: theme.lineHeight,
  },
});
