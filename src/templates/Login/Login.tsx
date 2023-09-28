import { Button, StyleSheet, View } from "react-native";
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
import { useNavigation } from "@react-navigation/native";

export const Login = ({ navigation }: any) => {
  const { control, handleSubmit } = useForm();
  const context = useContext(UserContext);

  const onSubmit = async (data: any) => {
    const loginResponseData = await login(data);
    context?.setUser(loginResponseData);
    saveSessionToken(loginResponseData.token);
  };

  useEffect(() => {
    //NOTE - SOMENTE PARA DESENVOLVIMENTO, PARA NÃO PRECISAR LOGAR TODA VEZ
    const userData = {
      name: "flavio",
      email: "flavio@fla.com",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk1NTc5NjkzLCJleHAiOjE3MDM0NjM2OTN9.a42ZccXgNEHf6gZvf0YuVgasm06CixjTEsLhyxpHK4k",
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
        />
        <TextField
          control={control}
          name="password"
          status={TextFieldStatus.Active}
          placeholder="Digite sua Senha"
        />
      </View>
      <Button
        title="Entrar"
        onPress={handleSubmit(onSubmit)}
        color={theme.colorsSecondary.green[400]}
        accessibilityLabel="Entrar"
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontFamily: "Roboto_700Bold",
    textAlign: "center",
    lineHeight: theme.lineHeight,
  },
});
