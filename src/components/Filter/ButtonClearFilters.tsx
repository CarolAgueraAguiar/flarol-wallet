import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonClearFiltersProps {
  onPress: () => void;
}

const ButtonClearFilters: React.FC<ButtonClearFiltersProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: "red" }]}
    >
      <Text style={styles.buttonText}>Limpar Filtros</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    marginHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
});

export default ButtonClearFilters;
