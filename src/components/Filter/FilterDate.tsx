import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { formatarDataTimeStamp } from "../../utils/Date";
import { useToast } from "react-native-toast-notifications";

interface FilterDateProps {
  onFilterChange: (startDate: Date | null, endDate: Date | null) => void;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
}

export const FilterDate: React.FC<FilterDateProps> = ({
  onFilterChange,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const toast = useToast();

  const handleStartDateChange = (
    event: any,
    selectedDate: Date | undefined
  ) => {
    setShowStartDatePicker(false);
    if (selectedDate !== undefined) {
      if (endDate !== null && selectedDate > endDate) {
        toast.show("A data inicial não pode ser maior que a final", {
          type: "danger",
          duration: 2000,
        });
      } else {
        setStartDate(selectedDate);
        onFilterChange(selectedDate, endDate);
      }
    }
  };

  const handleEndDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowEndDatePicker(false);
    if (selectedDate !== undefined) {
      if (startDate !== null && selectedDate < startDate) {
        toast.show("A data final não pode ser menor que a inicial", {
          type: "danger",
          duration: 2000,
        });
      } else {
        setEndDate(selectedDate);
        onFilterChange(startDate, selectedDate);
      }
    }
  };

  return (
    <View style={styles.column}>
      <View
        style={[
          styles.columnLabels,
          {
            marginBottom: showStartDatePicker || showEndDatePicker ? 12 : 0,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => setShowStartDatePicker(true)}
          style={[styles.columnLabel, styles.filterButton]}
        >
          <Text style={styles.filterButtonText}>
            {startDate
              ? `Início: ${formatarDataTimeStamp(startDate.toString())}`
              : "Selecionar Início"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowEndDatePicker(true)}
          style={[styles.columnLabel, styles.filterButton]}
        >
          <Text style={styles.filterButtonText}>
            {endDate
              ? `Fim: ${formatarDataTimeStamp(endDate.toString())}`
              : "Selecionar Fim"}
          </Text>
        </TouchableOpacity>
      </View>

      {showStartDatePicker && (
        <DateTimePicker
          locale="pt-BR"
          testID="startDateTimePicker"
          value={startDate || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleStartDateChange}
        />
      )}

      {showEndDatePicker && (
        <DateTimePicker
          locale="pt-BR"
          testID="endDateTimePicker"
          value={endDate || new Date()}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleEndDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    flex: 1,
    marginVertical: 10,
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
