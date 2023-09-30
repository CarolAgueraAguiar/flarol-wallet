import { useContext, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserContext } from "../../context/UserContext";
import {
  TextField,
  TextFieldStatus,
} from "../../components/TextFieldStatus/TextFieldStatus";
import { useForm } from "react-hook-form";
import { getUsers, updateUser } from "../../services/users/users";
import Profile from "../../components/Header/Profile";
import Avi from "../../../assets/avatar.png";
import { colors } from "../../styles/theme";

export const ListUser = ({ navigation: { navigate, setOptions } }: any) => {
  const context = useContext(UserContext);

  setOptions({
    title: "Config do Usuário",
  });

  const { control, setValue, handleSubmit } = useForm();

  const getInfosUser = async () => {
    const userData = await getUsers();

    setValue("name", userData.name);
    setValue("email", userData.email);
  };

  useEffect(() => {
    getInfosUser();
  }, []);

  const onSubmit = async (data: any) => {
    await updateUser(data);
    context.logout();
    navigate("Login");
  };

  return (
    <View>
      <View style={styles.container}>
        <Profile
          img={Avi}
          imgContainerStyle={{ backgroundColor: colors.tertiary }}
          imgStyle={{ width: 90, height: 90 }}
        />
        <Text style={styles.text}>{context.user.name}</Text>
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
          name="name"
        />

        <TextField
          status={TextFieldStatus.Default}
          control={control}
          name="email"
        />

        <TextField
          status={TextFieldStatus.Default}
          control={control}
          name="password"
          placeholder="Digite sua Nova Senha"
        />

        <TextField
          status={TextFieldStatus.Default}
          control={control}
          name="confirm_password"
          placeholder="Confirme sua Nova Senha Novamente"
        />
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
    marginTop: 12,
    fontSize: 20,
  },
});
