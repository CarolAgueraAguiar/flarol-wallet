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
import { FilterIncomes } from "../../../components/Filter/FilterIncomes";
import { FilterDate } from "../../../components/Filter/FilterDate";
import ButtonClearFilters from "../../../components/Filter/ButtonClearFilters";
import { useToast } from "react-native-toast-notifications";
import { FormErrors } from "../../Login/Login";

export const ListIncome = ({ navigation }: any) => {
  const [incomes, setIncomes] = useState<GetTransactionProps[]>([]);
  const isFocused = useIsFocused();

  const [filteredIncomes, setFilteredIncomes] = useState<
    GetTransactionProps[] | null
  >(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const toast = useToast();

  const transactionsData = async () => {
    const [data, error] = await listIncomes();

    if (error) {
      const errorObject: FormErrors = {};

      error.message.forEach((errorItem) => {
        return (errorObject[errorItem.field] = {
          message: errorItem.error,
          type: "required",
        });
      });

      if (errorObject.wallet_id) {
        toast.show(errorObject.wallet_id.message, {
          type: "danger",
        });
      }

      return;
    }

    if (data && data.length > 0) {
      setIncomes(data);
      applyFilter(data, filterStatus, startDate, endDate);
      return;
    }

    setIncomes([]);
    setFilteredIncomes([]);
  };

  const applyFilter = (
    data: GetTransactionProps[],
    status: string | null,
    startDate: Date | null,
    endDate: Date | null
  ) => {
    let filteredData = data;

    if (status !== null) {
      filteredData = filteredData.filter(
        (expense) => expense.status === status
      );
    }

    if (startDate !== null) {
      filteredData = filteredData.filter(
        (expense) => new Date(expense.date) >= startDate
      );
    }

    if (endDate !== null) {
      filteredData = filteredData.filter(
        (expense) => new Date(expense.date) <= endDate
      );
    }

    setFilteredIncomes(filteredData);
  };

  const setNewFilterStatus = (status: string | null) => {
    if (incomes) {
      applyFilter(incomes, status, startDate, endDate);
      setFilterStatus(status);
    }
  };

  const setFilterDate = (start: Date | null, end: Date | null) => {
    if (incomes) {
      applyFilter(incomes, filterStatus, start, end);
      setStartDate(start);
      setEndDate(end);
    }
  };

  const handleClearFilters = () => {
    setFilterDate(null, null);
    setNewFilterStatus(null);
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
      data={filteredIncomes}
      keyExtractor={(item) => String(item.id)}
      ListHeaderComponent={() => (
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddIncome")}
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
          {filteredIncomes && filteredIncomes.length > 0 && (
            <View
              style={{
                backgroundColor: "#f2f2f2",
                margin: 12,
                borderRadius: 12,
                padding: 12,
              }}
            >
              <FilterIncomes
                onFilterChange={setNewFilterStatus}
                filterStatus={filterStatus}
              />
              <FilterDate
                onFilterChange={setFilterDate}
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
              <ButtonClearFilters onPress={handleClearFilters} />
            </View>
          )}
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
          onPress={() => {
            if (item.canUpdate) {
              onNavigation(item.id, item.wallet_id);
            }
          }}
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
              {item.category && (
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
              )}
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
    maxWidth: 200,
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
