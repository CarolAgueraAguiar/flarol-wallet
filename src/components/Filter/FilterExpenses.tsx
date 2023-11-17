import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { TransactionStatus } from "../../enum/TransactionStatus";

interface FilterProps {
  onFilterChange: (status: string | null) => void;
  filterStatus: string | null;
}

export const FilterExpenses: React.FC<FilterProps> = ({
  onFilterChange,
  filterStatus,
}) => {
  return (
    <View style={styles.column}>
      <View style={styles.columnLabels}>
        <TouchableOpacity
          onPress={() =>
            onFilterChange(
              filterStatus === TransactionStatus.PAIED
                ? null
                : TransactionStatus.PAIED
            )
          }
          style={[
            styles.columnLabel,
            styles.filterButton,
            {
              backgroundColor:
                filterStatus === TransactionStatus.PAIED ? "#469B88" : "#fff",
            },
          ]}
        >
          <Text
            style={[
              styles.filterButtonText,
              {
                color:
                  filterStatus === TransactionStatus.PAIED ? "#fff" : "#333",
              },
            ]}
          >
            Pago
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            onFilterChange(
              filterStatus === TransactionStatus.NOT_PAIED
                ? null
                : TransactionStatus.NOT_PAIED
            )
          }
          style={[
            styles.columnLabel,
            styles.filterButton,
            {
              backgroundColor:
                filterStatus === TransactionStatus.NOT_PAIED
                  ? "#E78C9D"
                  : "#fff",
            },
          ]}
        >
          <Text
            style={[
              styles.filterButtonText,
              {
                color:
                  filterStatus === TransactionStatus.NOT_PAIED
                    ? "#fff"
                    : "#333",
              },
            ]}
          >
            Não Pago
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    flex: 1,
    marginHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  columnLabels: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  columnLabel: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    width: "47%",
    textAlign: "center",
    paddingVertical: 10,
  },

  filterButton: {
    paddingVertical: 10,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },

  filterButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});
