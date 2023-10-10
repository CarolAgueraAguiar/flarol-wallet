import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { theme } from "../../styles/theme";

function StyledButton({ title, onPress, isPrimary }: any) {
  const buttonStyles = isPrimary
    ? styles.primaryButton
    : styles.secondaryButton;

  const buttonTextStyles = isPrimary
    ? styles.buttonText
    : styles.buttonTextSecondary;

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={buttonTextStyles}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    margin: 10,
    backgroundColor: "#bdc30f",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  secondaryButton: {
    margin: 10,
    backgroundColor: "#242424",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonTextSecondary: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  buttonText: {
    color: "#242424",
    fontSize: 16,
    textAlign: "center",
  },
});

export default StyledButton;
