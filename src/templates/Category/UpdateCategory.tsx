import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  TextField,
  TextFieldStatus,
} from "../../components/TextFieldStatus/TextFieldStatus";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  listIcons,
  showCategories,
  updateCategory,
} from "../../services/categories/categories";
import { Picker } from "@react-native-picker/picker";
import { SvgXml } from "react-native-svg";
import { FormErrors } from "../Login/Login";
import { useToast } from "react-native-toast-notifications";
import { Icon } from "../../types/categories/categories";
import { Decoration } from "../../../assets/svg/Decoration";
import { CircleIcon } from "../../../assets/svg/CircleIcon";

export const UpdateCategory = ({ navigation: { navigate }, route }: any) => {
  const { id } = route.params;
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toast = useToast();

  const [icons, setIcons] = useState<Icon[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<any>();
  const [selectedIconData, setSelectedIconData] = useState<any>();

  const getCategories = async (id: number) => {
    const categoriesData = await showCategories(id);
    setValue("description", categoriesData.description);
    setSelectedIcon(categoriesData.icon.id);
    setSelectedIconData(categoriesData.icon.data);
  };

  const getIcons = async () => {
    const response = await listIcons();
    setIcons(response);
  };

  useEffect(() => {
    getCategories(id);
    getIcons();
  }, []);

  const onSubmit = async (data: any) => {
    const [response, error] = await updateCategory({
      description: data.description,
      icon_id: selectedIcon,
      id: id,
    });

    if (response === 204) {
      toast.show("Categoria alterada com sucesso", {
        type: "success",
      });
      navigate("Categoria");
    } else {
      toast.show(`Erro ao alterar categoria (${error?.statusCode})`, {
        type: "danger",
      });
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>Categoria</Text>
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

        {icons && (
          <View style={styles.itemContainer}>
            <Picker
              selectedValue={selectedIcon}
              style={{
                height: 200,
                backgroundColor: "#fff",
                width: 265,
                borderRadius: 5,
                marginRight: 10,
              }}
              onValueChange={(itemValue) => {
                setSelectedIcon(itemValue);
                setSelectedIconData(
                  icons.find((icon: any) => icon.id === itemValue)?.data
                );
              }}
            >
              {icons.map((icon: any) => (
                <Picker.Item
                  key={icon.id}
                  label={icon.desription}
                  value={icon.id}
                />
              ))}
            </Picker>
            {selectedIconData && (
              <SvgXml
                xml={selectedIconData}
                width={50}
                height={50}
                color="white"
              />
            )}
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
    backgroundColor: "#bdc30fa2",
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
