import { StyleSheet, View, Text, TextInput } from "react-native";
import { theme } from "../../../styles/theme";

export interface TextFieldProps {
  status: TextFieldStatus;
  placeholder?: string;
}

export enum TextFieldStatus {
  Default = "Default",
  Active = "Active",
  Filled = "Filled",
  Error = "Error",
  Disabled = "Disabled",
}

export const TextField = (props: TextFieldProps) => {
  const classes = {
    root: [
      styles.root,
      props.status === TextFieldStatus.Disabled && styles.rootStatusDisabled,
      props.status === TextFieldStatus.Error && styles.rootStatusError,
      props.status === TextFieldStatus.Active && styles.rootStatusActive,
    ],
    text: [
      styles.text,
      props.status === TextFieldStatus.Disabled && styles.textStatusDisabled,
      props.status === TextFieldStatus.Error && styles.textStatusError,
      props.status === TextFieldStatus.Filled && styles.textStatusFilled,
      props.status === TextFieldStatus.Active && styles.textStatusActive,
    ],
  };

  return (
    <View style={classes.root}>
      <TextInput
        style={classes.text}
        placeholder={props.placeholder}
        placeholderTextColor={theme.colorsSecondary.gray[300]}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 328,
    alignItems: "center",
    gap: 8,
    backgroundColor: theme.colorsSecondary.green[200],
    flexDirection: "row",
    padding: 16,
    borderRadius: 6,
    margin: 8,
  },
  rootStatusActive: {
    borderWidth: 1,
    borderColor: theme.colorsSecondary.green[500],
    borderStyle: "solid",
  },
  rootStatusError: {
    borderWidth: 1,
    borderColor: "#F75A68",
    borderStyle: "solid",
  },
  rootStatusDisabled: {
    opacity: 0.5,
  },
  text: {
    height: 24,
    flexDirection: "column",
    justifyContent: "center",
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    color: theme.colorsSecondary.gray[200],
    fontFamily: "Roboto_300Light",
    fontSize: 16,
  },
  textStatusActive: {
    color: theme.colorsSecondary.green[500],
  },
  textStatusFilled: {
    color: theme.colorsSecondary.green[500],
  },
  textStatusError: {
    color: "#F75A68",
  },
  textStatusDisabled: {
    color: theme.colorsSecondary.gray[200],
  },
});