import React, { FunctionComponent } from "react";
import { TextProps } from "./types";
import { colors } from "../../styles/theme";
import { StyleSheet, Text } from "react-native";

const RegularText: FunctionComponent<TextProps> = (props) => {
  return <Text style={styles.text}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    textAlign: "left",
    fontFamily: "Lato-Bold",
  },
});

export default RegularText;
