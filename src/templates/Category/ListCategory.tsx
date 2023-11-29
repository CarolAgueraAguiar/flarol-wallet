import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import {
  deleteCategory,
  listCategory,
} from "../../services/categories/categories";
import { GetCategoriesProps } from "../../types/categories/categories";
import { Decoration } from "../../../assets/svg/Decoration";
import { CircleIcon } from "../../../assets/svg/CircleIcon";
import { Add } from "../../../assets/svg/Add";
import { SvgXml } from "react-native-svg";

export const ListCategory = ({ navigation }: any) => {
  const [categories, setCategories] = useState<GetCategoriesProps[]>([]);
  const isFocused = useIsFocused();

  const cardColors = ["#9DA7D0", "#469B88", "#377CC8", "#EED868", "#E78C9D"];

  const getCardColor = (index: number) => {
    const colorIndex = index % cardColors.length;
    return cardColors[colorIndex];
  };

  const categoriesData = async () => {
    const data = await listCategory();
    setCategories(data);
  };

  const onNavigation = (id: number) => {
    navigation.navigate("AtualizarCategoria", {
      id,
    });
  };

  const deleteCategoryAsync = async (id: number) => {
    await deleteCategory(id);
    categoriesData();
  };

  const handleDeleteCategory = async (id: number) => {
    Alert.alert("Tem certeza que quer excluir ?", "Absoluta ?", [
      {
        text: "Cancelar",
        onPress: () => ({}),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          deleteCategoryAsync(id);
        },
      },
    ]);
  };

  useEffect(() => {
    if (isFocused) {
      categoriesData();
    }
  }, [isFocused]);

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => String(item.id)}
      ListHeaderComponent={() => (
        <View style={{ margin: 12 }}>
          <View style={styles.container}>
            <Text style={styles.text}>Categoria</Text>
            <View style={{ position: "absolute", top: 0, right: 0 }}>
              <Decoration />
            </View>
            <View style={{ position: "absolute", bottom: 0, left: 0 }}>
              <CircleIcon />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("AdicionarCategoria")}
            style={{ display: "flex", alignItems: "center", margin: 12 }}
          >
            <View style={styles.buttonAdd}>
              <Add />
              <Text
                style={{ marginLeft: 10, color: "#fff", fontWeight: "600" }}
              >
                Adicionar
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      renderItem={({ item, index }) => (
        <View style={{ marginHorizontal: 12 }}>
          <TouchableOpacity
            onPress={() => onNavigation(item.id)}
            style={[
              styles.itemContainer,
              {
                backgroundColor: getCardColor(index),
              },
            ]}
          >
            <Text style={styles.itemText}>{item.description}</Text>
            <SvgXml
              xml={item.icon.data}
              style={{ width: 120 }}
              width={30}
              height={30}
              color="white"
            />
            <Button
              title="Excluir"
              color="red"
              onPress={() => {
                handleDeleteCategory(item.id);
              }}
            />
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    height: 100,
    marginVertical: 8,
    width: "100%",
    borderRadius: 24,
    borderWidth: 2,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "700",
    width: 120,
  },
  container: {
    borderRadius: 24,
    lineHeight: 1.25,
    padding: 24,
    height: 150,
    backgroundColor: "#bdc30fa2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonAdd: {
    borderRadius: 100,
    margin: 12,
    height: 40,
    width: "100%",
    backgroundColor: "green",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",

    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#fff",
    borderTopColor: "white",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 30,
  },
});
