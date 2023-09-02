import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../../styles/theme";
import {
  TextField,
  TextFieldStatus,
} from "../../components/TextFieldStatus/TextFieldStatus";
import { Logo } from "../../components/Logo/Logo";
import StyledButton from "../../components/StyledButton/StyledButton";

export const Login = ({ navigation }: any) => {
  return (
    <View style={styles.containerLogin}>
      <Logo />
      <View style={styles.containerTwo}>
        <TextField
          status={TextFieldStatus.Active}
          placeholder="Digite seu E-mail"
        />
        <TextField
          status={TextFieldStatus.Active}
          placeholder="Digite sua Senha"
        />
      </View>
      <StyledButton
        title="Entrar"
        isPrimary
        onPress={() => navigation.navigate("Cadastrar")}
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
