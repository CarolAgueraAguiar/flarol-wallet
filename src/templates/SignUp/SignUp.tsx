import { Button, StyleSheet, View } from "react-native";
import {
  TextField,
  TextFieldStatus,
} from "../../components/TextFieldStatus/TextFieldStatus";
import { theme } from "../../../styles/theme";
import { Logo } from "../../components/Logo/Logo";
import { useForm } from "react-hook-form";
import { storeUsers } from "../../services/users/users";

export const SignUp = () => {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data: any) => {
    storeUsers(data);
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
        />
        <TextField
          status={TextFieldStatus.Active}
          placeholder="Digite sua E-mail"
          control={control}
          name="email"
        />
        <TextField
          status={TextFieldStatus.Active}
          placeholder="Digite sua Senha"
          control={control}
          name="password"
        />
        <TextField
          status={TextFieldStatus.Active}
          placeholder="Digite sua Senha novamente"
          control={control}
          name="confirmPassword"
        />
      </View>
      <Button
        onPress={handleSubmit(onSubmit)}
        title="Cadastrar"
        color={theme.colorsSecondary.green[100]}
        accessibilityLabel="Cadastrar"
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
