import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { listIncomes } from "../../../services/transactions/transactions";
import { GetTransactionProps } from "../../../types/transactions/transactions";
import { Add } from "../../../../assets/svg/Add";
import { formatNumber } from "../../../utils/mask";
import { theme } from "../../../styles/theme";
import { SvgXml } from "react-native-svg";
import { TransactionStatus } from "../../../enum/TransactionStatus";

export const ListIncome = ({ navigation }: any) => {
  const [incomes, setIncomes] = useState<GetTransactionProps[]>();
  const isFocused = useIsFocused();

  const transactionsData = async () => {
    const data = await listIncomes();
    setIncomes(data);
  };

  const onNavigation = (id: number, walletId: number) => {
    navigation.navigate("UpdateIncome", {
      id,
      walletId,
    });
  };

  const statusExpense = (status: string) => {
    if (status === TransactionStatus.RECEIVED) {
      return (
        <View
          style={{
            backgroundColor: "green",
            padding: 6,
            width: 100,
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
            Recebido
          </Text>
        </View>
      );
    }
    return (
      <View
        style={{
          backgroundColor: "red",
          padding: 6,
          width: 100,
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
          Não Recebido
        </Text>
      </View>
    );
  };

  const cardColors = [
    "#469B88",
    "#E78C9D",
    "#EED868",
    "#377CC8",
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
      data={incomes}
      keyExtractor={(item) => String(item.id)}
      ListHeaderComponent={() => (
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddIncome")}
            style={{ display: "flex", alignItems: "center", margin: 12 }}
          >
            <View style={styles.buttonAdd}>
              <Add />
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
          onPress={() => onNavigation(item.id, item.wallet_id)}
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
              alignItems: "center",
              backgroundColor: getCardColor(index),
            }}
          >
            <View
              style={{
                marginLeft: 12,
                height: "80%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-around",
              }}
            >
              <Text style={styles.quadradoTextHeader}>{item.description}</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#9a9292",
                  padding: 6,
                  borderRadius: 5,
                  width: "auto",
                  justifyContent: "space-between",
                }}
              >
                <SvgXml
                  xml={item.category.icon.data}
                  width={20}
                  height={20}
                  color="white"
                />
                <Text
                  style={{ color: "#fff", fontWeight: "600", marginLeft: 10 }}
                >
                  {item.category.slug}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginRight: 12,
                height: "80%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-around",
              }}
            >
              <Text style={styles.quadradoTextBody}>
                {formatNumber(String(item.amount))}
              </Text>
              {statusExpense(item.status)}
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
    paddingBottom: 12,
  },
  quadradoTextBody: {
    fontSize: 16,
    fontWeight: "700",
    paddingBottom: 12,
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
