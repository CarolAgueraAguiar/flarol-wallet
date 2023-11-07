import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { listTransactions } from "../../../services/transactions/transactions";
import { GetTransactionProps } from "../../../types/transactions/transactions";
import { Add } from "../../../../assets/svg/Add";
import { formatNumber } from "../../../utils/mask";
import { theme } from "../../../styles/theme";
import { SvgXml } from "react-native-svg";
import { TransactionStatus } from "../../../enum/TransactionStatus";

export const ListExpenses = ({ navigation }: any) => {
  const [expenses, setExpenses] = useState<GetTransactionProps[]>();
  const isFocused = useIsFocused();

  const transactionsData = async () => {
    const data = await listTransactions();
    setExpenses(data);
  };

  const onNavigation = (id: number) => {
    navigation.navigate("UpdateExpenses", {
      id,
    });
  };

  const statusExpense = (status: string) => {
    if (status === TransactionStatus.PAIED) {
      return (
        <View
          style={{
            backgroundColor: "green",
            padding: 6,
            width: 60,
            margin: 12,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Pago
          </Text>
        </View>
      );
    }
    return (
      <View
        style={{
          backgroundColor: "red",
          padding: 6,
          width: 60,
          margin: 12,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Não Pago
        </Text>
      </View>
    );
  };

  const cardColors = [
    "#E78C9D",
    "#EED868",
    "#377CC8",
    "#469B88",
    "#9DA7D0",
    "#E0533D",
  ];

  const getCardColor = (index: number) => {
    const colorIndex = index % cardColors.length;
    return cardColors[colorIndex];
  };

  useEffect(() => {
    if (isFocused) {
      transactionsData();
    }
  }, [isFocused]);

  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => String(item.id)}
      ListHeaderComponent={() => (
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddExpenses")}
            style={{ display: "flex", alignItems: "center", margin: 12 }}
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
              height: 230,
              width: "100%",
              borderRadius: 24,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: getCardColor(index),
            }}
          >
            <View>
              <Text style={styles.quadradoTextHeader}>
                Nome: {item.description}
              </Text>
              <Text style={styles.quadradoTextBody}>
                Valor: {formatNumber(String(item.amount))}
              </Text>
              {statusExpense(item.status)}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  margin: 12,
                }}
              >
                <SvgXml
                  xml={item.category.icon.data}
                  width={50}
                  height={50}
                  color="white"
                />
                <Text>{item.category.slug}</Text>
              </View>
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
                  // handleDeleteWallet(item.id);
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
    padding: 12,
  },
  quadradoTextBody: {
    fontSize: 16,
    fontWeight: "700",
    padding: 12,
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
