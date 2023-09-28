import {
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

export const ListCategory = ({ navigation }: any) => {
  const [categories, setCategories] = useState<GetCategoriesProps[]>([]);
  const isFocused = useIsFocused();

  const categoriesData = async () => {
    const data = await listCategory();
    setCategories(data);
  };

  const onNavigation = (id: number) => {
    navigation.navigate("AtualizarCategoria", {
      id,
    });
  };

  const handleDeleteCategory = async (id: number) => {
    await deleteCategory(id);

    categoriesData();
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
        <>
          <View style={styles.container}>
            <Text style={styles.text}>Categoria</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("AdicionarCategoria")}
          >
            <View style={styles.buttonAdd}>
              <Text>Adicionar</Text>
            </View>
          </TouchableOpacity>
        </>
      )}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.description}</Text>
          <Text style={styles.itemText}>{item.icon.description}</Text>
          <Button
            title="Editar"
            color="yellow"
            onPress={() => onNavigation(item.id)}
          />
          <Button
            title="Excluir"
            color="red"
            onPress={() => {
              handleDeleteCategory(item.id);
            }}
          />
        </View>
      )}
    />
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
