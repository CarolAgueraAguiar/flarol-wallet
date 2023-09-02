//Nome, email e senha (com confirmação)
//Nome da carteira e montante inicial

import { Alert, Button, StyleSheet, Text, View } from "react-native";
import {
  TextField,
  TextFieldStatus,
} from "../../components/TextFieldStatus/TextFieldStatus";
import { theme } from "../../../styles/theme";
import { Logo } from "../../components/Logo/Logo";

export const SignUp = () => {
  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.containerTwo}>
        <TextField
          status={TextFieldStatus.Active}
          placeholder="Digite seu nome"
        />
        <TextField
          status={TextFieldStatus.Active}
          placeholder="Digite sua E-mail"
        />
        <TextField
          status={TextFieldStatus.Active}
          placeholder="Digite sua Senha"
        />
        <TextField
          status={TextFieldStatus.Active}
          placeholder="Digite sua Senha novamente"
        />
      </View>
      <Button
        onPress={() =>
          Alert.alert(
            "Mensagem:",
            "Deu um erro ao fazer login (ERROR - 404)",
            [
              {
                text: "Cancelar",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "OK",
                onPress: () => console.log("OK Pressed"),
                style: "default",
              },
            ],
            { cancelable: true, userInterfaceStyle: "dark" }
          )
        }
        title="Entrar"
        color={theme.colorsSecondary.green[100]}
        accessibilityLabel="Entrar"
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
