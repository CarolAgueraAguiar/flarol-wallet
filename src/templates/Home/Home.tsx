import { View, StyleSheet } from "react-native";
import { Logo } from "../../components/Logo/Logo";
import StyledButton from "../../components/StyledButton/StyledButton";

function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Logo />
      <View>
        <StyledButton
          title="Sign In"
          onPress={() => navigation.navigate("Login")}
        />
        <StyledButton
          title="Sign Up"
          isPrimary
          onPress={() => navigation.navigate("Cadastrar")}
        />
      </View>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
});
