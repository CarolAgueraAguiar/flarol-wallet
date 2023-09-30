import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { deleteWallet, listWallets } from "../../services/wallets/wallets";
import { useContext, useEffect, useState } from "react";
import { formatNumber } from "../../utils/mask";
import { ListWalletsProps } from "../../types/wallets/wallets";
import { useIsFocused } from "@react-navigation/native";
import { UserContext } from "../../context/UserContext";

export const ListWallet = ({ navigation }: any) => {
  const context = useContext(UserContext);
  const [wallets, setWallets] = useState<ListWalletsProps[]>([]);
  const isFocused = useIsFocused();

  const walletsData = async () => {
    let totalAmount = 0;

    const walletData = await listWallets();
    setWallets(walletData);

    walletData.map((wallet) => {
      const walletAmount = wallet.amount;
      totalAmount += walletAmount;
      context?.setWalletAmount(totalAmount);
    });
  };

  const onNavigation = (id: number) => {
    navigation.navigate("AtualizarCarteira", {
      id,
    });
  };

  const deleteWalletAsync = async (id: number) => {
    await deleteWallet(id);
    walletsData();
  };

  const handleDeleteWallet = async (id: number) => {
    Alert.alert("Tem certeza que quer excluir ?", "Absoluta ?", [
      {
        text: "Cancelar",
        onPress: () => ({}),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          deleteWalletAsync(id);
        },
      },
    ]);
  };

  useEffect(() => {
    if (isFocused) {
      walletsData();
    }
  }, [isFocused]);

  return (
    <FlatList
      data={wallets}
      keyExtractor={(item) => String(item.id)}
      ListHeaderComponent={() => (
        <>
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
        </>
      )}
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
              handleDeleteWallet(item.id);
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
