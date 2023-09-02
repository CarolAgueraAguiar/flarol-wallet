import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { theme } from "../../../styles/theme";

function StyledButton({ title, onPress, isPrimary }: any) {
  const buttonStyles = isPrimary
    ? styles.primaryButton
    : styles.secondaryButton;

  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    margin: 10,
    backgroundColor: theme.colorsSecondary.green[400],
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  secondaryButton: {
    margin: 10,
    backgroundColor: theme.colorsSecondary.blue[400],
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default StyledButton;
