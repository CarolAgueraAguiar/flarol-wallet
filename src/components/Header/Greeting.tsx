import { FunctionComponent } from "react";
import RegularText from "../Texts/RegularText";
import { colors } from "../../styles/theme";
import { StyleProp, StyleSheet, TextStyle, View } from "react-native";
import SmallText from "../Texts/SmallText";

const styles = StyleSheet.create({
  box: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
  },
});

interface GreetingProps {
  mainText: string;
  subText: string;
  mainTextStyles?: StyleProp<TextStyle>;
  subTextStyles?: StyleProp<TextStyle>;
}

const Greeting: FunctionComponent<GreetingProps> = (props) => {
  return (
    <View style={styles.box}>
      <RegularText
        textStyles={[
          {
            color: colors.secondary,
            fontSize: 22,
          },
          props.mainTextStyles,
        ]}
      >
        {props.mainText}
      </RegularText>
      <SmallText
        textStyles={[
          {
            color: colors.graydark,
          },
          props.subTextStyles,
        ]}
      >
        {props.subText}
      </SmallText>
    </View>
  );
};

export default Greeting;
