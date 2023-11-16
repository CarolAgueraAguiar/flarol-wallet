import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../styles/theme";
import { IconLogo } from "../../../assets/svg/IconLogo";

export const Logo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <IconLogo />
        <Text style={styles.title}>Flarol Wallet</Text>
      </View>
      <View>
        <Text style={styles.subTitle}>Aqui você gerencia suas finanças</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  title: {
    color: theme.colorsSecondary.green[500],
    fontWeight: "bold",
    fontSize: 28,
  },
  subTitle: {
    color: theme.colorsSecondary.green[500],
    fontWeight: "400",
    fontSize: 14,
    textAlign: "center",
  },
  logo: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: 225,
  },
});
