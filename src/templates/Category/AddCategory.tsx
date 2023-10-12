import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  TextField,
  TextFieldStatus,
} from "../../components/TextFieldStatus/TextFieldStatus";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { theme } from "../../styles/theme";
import { listIcons, storeCategory } from "../../services/categories/categories";
import { Decoration } from "../../../assets/svg/Decoration";
import { CircleIcon } from "../../../assets/svg/CircleIcon";
import { SvgXml } from "react-native-svg";

export const AddCategory = ({ navigation: { navigate } }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [icons, setIcons] = useState<any>();
  const [selectedIcon, setSelectedIcon] = useState<any>();

  const getIcons = async () => {
    const response = await listIcons();
    setSelectedIcon(response?.[0].data);
    setIcons(response);
  };

  useEffect(() => {
    getIcons();
  }, []);

  const onSubmit = async (data: any) => {
    await storeCategory(data);
    navigate("Categoria");
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>Adicionar Categoria</Text>
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
          placeholder="Digite o nome da categoria"
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
              onValueChange={(itemValue) => setSelectedIcon(itemValue)}
            >
              {icons?.map((icon: any) => (
                <Picker.Item
                  key={icon.id}
                  label={icon.desription}
                  value={icon.data}
                />
              ))}
            </Picker>
            <SvgXml xml={selectedIcon} width={50} height={50} color="white" />
          </View>
        )}
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <View style={styles.buttonAdd}>
          <Text style={{ color: "#fff", fontWeight: "600" }}>Criar</Text>
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
