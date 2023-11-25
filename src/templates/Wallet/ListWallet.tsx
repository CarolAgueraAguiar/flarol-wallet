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
        <TouchableOpacity
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: 12,
          }}
          onPress={() => onNavigation(item.id)}
        >
          <View
            style={{
              height: 100,
              width: "100%",
              borderRadius: 24,
              borderWidth: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: getCardColor(index),
            }}
          >
            <View
              style={{
                width: "100%",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 12,
              }}
            >
              <Text style={styles.quadradoTextHeader}>{item.description}</Text>
              <View
                style={{
                  backgroundColor: "green",
                  borderRadius: 10,
                  borderWidth: 2,
                }}
              >
                <Text style={styles.quadradoTextBody}>
                  {formatNumber(String(item.amount))}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  quadradoTextHeader: {
    fontSize: 18,
    fontWeight: "600",
  },
  quadradoTextBody: {
    fontSize: 16,
    fontWeight: "700",
    padding: 6,
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
