import React from "react";
import { StyleSheet, View } from "react-native";
import { useForm, Controller, Control, FieldValues } from "react-hook-form";
import { TextInputMask } from "react-native-masked-text";
import { theme } from "../../../styles/theme";

export interface MoneyInputProps {
  control: Control<FieldValues, any>;
  name: string;
}

export default function MoneyInput({ control, name }: MoneyInputProps) {
  const { setValue } = useForm();

  return (
    <View style={styles.root}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInputMask
            style={styles.text}
            type="money"
            options={{
              precision: 2,
              separator: ",",
              delimiter: ".",
              unit: "R$",
              suffixUnit: "",
            }}
            value={value}
            onChangeText={(text) => {
              onChange(text);
              setValue(name, text);
            }}
            placeholder="Digite o valor"
          />
        )}
      />
    </View>
  );
}

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
  text: {
    height: 24,
    flexDirection: "column",
    justifyContent: "center",
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    color: theme.colorsSecondary.gray[700],
    fontFamily: "Roboto_300Light",
    fontSize: 16,
  },
});
