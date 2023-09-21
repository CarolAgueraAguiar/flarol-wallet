import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";
import AppLoading from "expo-app-loading";
import UserContextProvider, { UserContext } from "./src/context/UserContext";
import { Main } from "./src/Routes/routes";
import { AppRegistry } from "react-native";
import * as SecureStore from "expo-secure-store";
import { useContext, useEffect } from "react";

AppRegistry.registerComponent("YourAppName", () => App);

export default function App() {
  const context = useContext(UserContext);

  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

  let isAuthenticated = false;

  async function checkAuth() {
    try {
      const token = await SecureStore.getItemAsync("sessionToken");
      if (token) {
        isAuthenticated = true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkAuth();
  }, [context?.user.token]);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <UserContextProvider>
        <Main isAuthenticated={isAuthenticated} />
      </UserContextProvider>
    );
  }
}
