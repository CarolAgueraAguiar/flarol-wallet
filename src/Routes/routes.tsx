import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "../styles/theme";
import Home from "../templates/Home/Home";
import WelcomeScreen from "../templates/Welcome/Welcome";
import { SignUp } from "../templates/SignUp/SignUp";
import { Login } from "../templates/Login/Login";
import { ListWallet } from "../templates/Wallet/ListWallet";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import * as SplashScreen from "expo-splash-screen";
import { AddWallet } from "../templates/Wallet/AddWallet";
import { UpdateWallet } from "../templates/Wallet/UpdateWallet";

const { Navigator, Screen } = createStackNavigator();

export const Routes = () => {
  const { isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [isAuthenticated]);

  return (
    <NavigationContainer theme={theme}>
      {isAuthenticated ? (
        <Navigator
          screenOptions={{ headerShown: true }}
          initialRouteName="Carteira"
        >
          <Screen name="Home" component={Home} />
          <Screen name="Carteira" component={ListWallet} />
          <Screen name="AdicionarCarteira" component={AddWallet} />
          <Screen name="AtualizarCarteira" component={UpdateWallet} />
        </Navigator>
      ) : (
        <Navigator
          screenOptions={{ headerShown: true }}
          initialRouteName="Welcome"
        >
          <Screen name="Welcome" component={WelcomeScreen} />
          <Screen name="Cadastrar" component={SignUp} />
          <Screen name="Login" component={Login} />
        </Navigator>
      )}
    </NavigationContainer>
  );
};
