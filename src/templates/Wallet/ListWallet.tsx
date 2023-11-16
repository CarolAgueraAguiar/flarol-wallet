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
import { Add } from "../../../assets/svg/Add";
import { Decoration } from "../../../assets/svg/Decoration";
import { CircleIcon } from "../../../assets/svg/CircleIcon";
import { useToast } from "react-native-toast-notifications";
import { theme } from "../../styles/theme";

export const ListWallet = ({ navigation }: any) => {
  const context = useContext(UserContext);
  const [wallets, setWallets] = useState<ListWalletsProps[]>([]);
  const isFocused = useIsFocused();
  const toast = useToast();

  const cardColors = [
    "#E0533D",
    "#9DA7D0",
    "#469B88",
    "#377CC8",
    "#EED868",
    "#E78C9D",
  ];

  const getCardColor = (index: number) => {
    const colorIndex = index % cardColors.length;
    return cardColors[colorIndex];
  };

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
    toast.show("Carteira excluída com sucesso", { type: "success" });
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
        <View>
          <View style={styles.container}>
            <Text style={styles.text}>Carteira</Text>
            <View style={{ position: "absolute", top: 0, right: 0 }}>
              <Decoration />
            </View>
            <View style={{ position: "absolute", bottom: 0, left: 0 }}>
              <CircleIcon />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("AdicionarCarteira")}
            style={{ display: "flex", alignItems: "flex-end" }}
          >
            <View style={styles.buttonAdd}>
              <Add />
            </View>
          </TouchableOpacity>
        </View>
      )}
      renderItem={({ item, index }) => (
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 12,
          }}
        >
          <View
            style={{
              height: 176,
              width: "100%",
              borderRadius: 24,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: getCardColor(index),
            }}
          >
            <View style={{ maxWidth: 200 }}>
              <Text style={styles.quadradoTextHeader}>{item.description}</Text>
              <Text style={styles.quadradoTextBody}>
                {formatNumber(String(item.amount))}
              </Text>
            </View>
            <View style={{ padding: 24 }}>
              <TouchableOpacity
                style={{
                  margin: 10,
                  backgroundColor: "#242424",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                }}
                onPress={() => onNavigation(item.id)}
              >
                <Text
                  style={{
                    color: "yellow",
                    fontSize: 16,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  Editar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleDeleteWallet(item.id);
                }}
                style={{
                  margin: 10,
                  backgroundColor: "#242424",
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    color: "red",
                    fontSize: 16,
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                >
                  Excluir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  quadradoTextHeader: {
    fontSize: 18,
    fontWeight: "600",
    padding: 24,
  },
  quadradoTextBody: {
    fontSize: 16,
    fontWeight: "700",
    padding: 24,
  },
  columnLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#f2f2f2",
    width: "100%",
  },
  columnLabel: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    width: "40%",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: theme.colorsSecondary.green[500],
  },
  itemText: {
    fontSize: 16,
    fontWeight: "700",
    width: "33%",
  },
  container: {
    position: "relative",
    borderRadius: 24,
    lineHeight: 1.25,
    padding: 24,
    margin: 12,
    height: 150,
    backgroundColor: "#242424",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonAdd: {
    borderRadius: 100,
    margin: 12,
    height: 50,
    width: 50,
    backgroundColor: "green",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

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
