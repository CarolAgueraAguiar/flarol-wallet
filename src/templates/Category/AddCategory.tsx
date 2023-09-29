import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  TextField,
  TextFieldStatus,
} from "../../components/TextFieldStatus/TextFieldStatus";
import { useForm } from "react-hook-form";
import { storeWallets } from "../../services/wallets/wallets";
import { cleanNumber } from "../../utils/mask";
import { useEffect, useState } from "react";
import { theme } from "../../styles/theme";
import { storeCategory } from "../../services/categories/categories";

export const AddCategory = ({ navigation: { navigate } }: any) => {
  const { control, handleSubmit } = useForm();

  // const [selectedValue, setSelectedValue] = useState();

  useEffect(() => {
    //getIcons();
    //setSelectedValue(icons[0].id);
  }, []);

  const onSubmit = async (data: any) => {
    await storeCategory(data);
    navigate("Categoria");
  };

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text}>Adicionar Categoria</Text>
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
        />
        <TextField
          status={TextFieldStatus.Default}
          control={control}
          name="icon_id"
          inputMode="numeric"
          placeholder="Digite o id do icone"
        />
        {/* <Picker
          selectedValue={selectedValue}
          style={{
            backgroundColor: theme.colorsSecondary.green[200],
            width: 328,
            borderRadius: 5,
          }}
          onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
        >
          {icons.map((icon) => (
            <Picker.Item label={icon.description} value={icon.id} />
          ))
          ))}
        </Picker> */}
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
    backgroundColor: "#81B2CA",
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
