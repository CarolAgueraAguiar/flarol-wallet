import { useContext, useEffect } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserContext } from "../../context/UserContext";
import {
  TextField,
  TextFieldStatus,
} from "../../components/TextFieldStatus/TextFieldStatus";
import { useForm } from "react-hook-form";
import { deleteUser, getUser, updateUser } from "../../services/users/users";
import Profile from "../../components/Header/Profile";
import Avi from "../../../assets/avatar.png";
import { colors } from "../../styles/theme";
import { FormErrors } from "../Login/Login";
import { useToast } from "react-native-toast-notifications";

export const ListUser = ({ navigation: { navigate } }: any) => {
  const context = useContext(UserContext);
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const toast = useToast();

  const getInfosUser = async () => {
    const userData = await getUser();

    setValue("name", userData.name);
    setValue("email", userData.email);
  };

  useEffect(() => {
    getInfosUser();
  }, []);

  const onSubmit = async (data: any) => {
    if (
      data.password === undefined ||
      data.password === "" ||
      data.confirm_password === undefined ||
      data.confirm_password === ""
    ) {
      delete data.password;
      delete data.confirm_password;
    }

    const dataRequest = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password,
    };

    const [response, error] = await updateUser(dataRequest);

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

    if (response === 201) {
      toast.show("Porquinho criado com sucesso", {
        type: "success",
      });
      context.logout();
      navigate("Login");
    } else {
      toast.show("Erro ao criar porquinho", {
        type: "danger",
      });
    }
  };

  const deleteUserAsync = async () => {
    await deleteUser();
    context.logout();
    navigate("Welcome");
  };

  const handleDeleteCategory = async () => {
    Alert.alert(
      "Tem certeza que quer excluir seu usuário ?",
      "Não tem como recuperar, terá que criar uma nova conta ?",
      [
        {
          text: "Cancelar",
          onPress: () => ({}),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            deleteUserAsync();
          },
        },
      ]
    );
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
          errors={errors}
        />

        <TextField
          status={TextFieldStatus.Default}
          control={control}
          name="email"
          errors={errors}
        />

        <TextField
          status={TextFieldStatus.Default}
          control={control}
          name="password"
          placeholder="Digite sua Nova Senha"
          errors={errors}
        />

        <TextField
          status={TextFieldStatus.Default}
          control={control}
          name="confirm_password"
          placeholder="Confirme sua Nova Senha Novamente"
          errors={errors}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <View style={styles.buttonAdd}>
          <Text>Atualizar</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleDeleteCategory}>
        <View style={styles.buttonDelete}>
          <Text style={{ color: "#fff", fontWeight: "700" }}>
            Deletar meu usuário
          </Text>
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
  buttonDelete: {
    borderRadius: 24,
    lineHeight: 1.25,
    margin: 12,
    height: 40,
    backgroundColor: "red",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    marginTop: 12,
    fontSize: 20,
  },
});
