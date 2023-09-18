import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "../../styles/theme";
import Home from "../templates/Home/Home";
import WelcomeScreen from "../templates/Welcome/Welcome";
import { SignUp } from "../templates/SignUp/SignUp";
import { Login } from "../templates/Login/Login";

const Stack = createStackNavigator();

export const Main = () => {
  const context = useContext(UserContext);
  const isAuthenticated = context?.user.token ? true : false;
  return (
    <>
      <NavigationContainer theme={theme}>
        <Stack.Navigator>
          {isAuthenticated ? (
            <Stack.Group>
              <Stack.Screen name="Inicio" component={Home} />
            </Stack.Group>
          ) : (
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={WelcomeScreen} />
              <Stack.Screen name="Cadastrar" component={SignUp} />
              <Stack.Screen name="Login" component={Login} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
