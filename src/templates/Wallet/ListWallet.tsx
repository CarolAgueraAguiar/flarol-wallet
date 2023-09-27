import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { deleteWallet, listWallets } from "../../services/wallets/wallets";
import { useEffect, useState } from "react";
import { formatNumber } from "../../utils/mask";
import { ListWalletsProps } from "../../types/wallets/wallets";
import { useIsFocused } from "@react-navigation/native";

export const ListWallet = ({ navigation }: any) => {
  const [wallets, setWallets] = useState<ListWalletsProps[]>([]);
  const walletsData = async () => {
    const walletData = await listWallets();
    setWallets(walletData);
  };

  const onNavigation = (id: number) => {
    navigation.navigate("AtualizarCarteira", {
      id,
    });
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      walletsData();
    }
  }, [isFocused]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Carteira</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("AdicionarCarteira")}
      >
        <View style={styles.buttonAdd}>
          <Text>Adicionar</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        data={wallets}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.description}</Text>
            <Text style={styles.itemText}>
              {formatNumber(String(item.amount))}
            </Text>
            <Button
              title="Editar"
              color="yellow"
              onPress={() => onNavigation(item.id)}
            />
            <Button
              title="Excluir"
              color="red"
              onPress={() => {
                deleteWallet(item.id);
              }}
            />
          </View>
        )}
      />
    </ScrollView>
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
