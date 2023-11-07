import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  TextField,
  TextFieldStatus,
} from "../../components/TextFieldStatus/TextFieldStatus";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  showCategories,
  updateCategory,
} from "../../services/categories/categories";
import { Picker } from "@react-native-picker/picker";
import { SvgXml } from "react-native-svg";
import { FormErrors } from "../Login/Login";
import { useToast } from "react-native-toast-notifications";
import { Icon } from "../../types/categories/categories";

export const UpdateCategory = ({ navigation: { navigate }, route }: any) => {
  const { id } = route.params;
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast();

  const [icons, setIcons] = useState<Icon>();
  const [selectedIcon, setSelectedIcon] = useState<any>();
  const [selectedIconData, setSelectedIconData] = useState<any>();

  const getCategories = async (id: number) => {
    const categoriesData = await showCategories(id);
    console.log(categoriesData);

    setValue("description", categoriesData.description);
    setIcons(categoriesData.icon);
  };

  useEffect(() => {
    getCategories(id);
  }, []);

  const onSubmit = async (data: any) => {
    const [response, error] = await updateCategory({
      description: data.description,
      icon_id: selectedIcon.id,
      id: id,
    });

    if (error) {
      const errorObject: FormErrors = {};

      error.message.forEach((errorItem) => {
        return (errorObject[errorItem.field] = {
          message: errorItem.error,
          type: "required",
        });
      });

      if (errorObject.description) {
        toast.show("O nome da categoria não pode ser vazio", {
          type: "danger",
        });
      }

      return;
    }

    navigate("Categoria");
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>Atualizar Carteira</Text>
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

        {icons && (
          <View style={styles.itemContainer}>
            <Picker
              selectedValue={icons.id}
              style={{
                height: 200,
                backgroundColor: "#fff",
                width: 265,
                borderRadius: 5,
                marginRight: 10,
              }}
              onValueChange={(itemValue) => {
                setSelectedIcon(itemValue);
                setSelectedIconData(icons.data);
              }}
            >
              <Picker.Item
                key={icons.id}
                label={icons.description}
                value={icons.id}
              />
            </Picker>
            <SvgXml xml={icons.data} width={50} height={50} color="white" />
          </View>
        )}
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <View style={styles.buttonAdd}>
          <Text style={{ color: "#fff", fontWeight: "600" }}>Atualizar</Text>
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
    fontSize: 30,
  },
});
