import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "../../styles/theme";
import Home from "../templates/Home/Home";
import WelcomeScreen from "../templates/Welcome/Welcome";
import { SignUp } from "../templates/SignUp/SignUp";
import { Login } from "../templates/Login/Login";
import { Wallet } from "../templates/Wallet/Wallet";

const Stack = createStackNavigator();

export const Main = ({ isAuthenticated }: any) => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{ headerShown: true }}
        initialRouteName={isAuthenticated ? "Home" : "Welcome"}
      >
        <Stack.Group>
          {isAuthenticated ? (
            <>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Wallet" component={Wallet} />
            </>
          ) : (
            <>
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
              <Stack.Screen name="Cadastrar" component={SignUp} />
              <Stack.Screen name="Login" component={Login} />
            </>
          )}
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
