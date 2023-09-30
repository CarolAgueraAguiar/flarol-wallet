import React, { FunctionComponent } from "react";
import { TextProps } from "./types";
import { colors } from "../../styles/theme";
import { StyleSheet, Text } from "react-native";

const SmallText: FunctionComponent<TextProps> = (props) => {
  return <Text style={styles.text}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 13,
    textAlign: "left",
    fontFamily: "Lato-Regular",
  },
});

export default SmallText;
