import {
  ColorValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { theme } from "../../styles/theme";
import { WalletIcon } from "../../../assets/svg/WalletIcon";

export type ButtonCategoryProps = {
  categoryName: string;
  onClick: () => void;
  icon: React.ReactNode;
  color: ColorValue;
};

export const ButtonCategory = ({
  categoryName,
  onClick,
  icon,
  color,
}: ButtonCategoryProps) => {
  const styles = StyleSheet.create({
    circle: {
      width: 70,
      height: 70,
      borderRadius: 70 / 2,
      backgroundColor: color,
      aspectRatio: 1,
    },
    icon: {
      width: 70,
      height: 70,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
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

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        width: "33.33%"
      }}
    >
      <Text
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "600",
          marginBottom: 10,
          fontSize: 16,
          textAlign: "center",
        }}
      >
        {categoryName}
      </Text>
      <TouchableOpacity onPress={onClick}>
        <View style={styles.circle}>
          <View style={styles.icon}>{icon}</View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
