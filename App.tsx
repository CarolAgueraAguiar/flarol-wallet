import { useFonts } from "expo-font";
import UserContextProvider from "./src/context/UserContext";
import { Routes } from "./src/routes/routes";
import { AppRegistry } from "react-native";

AppRegistry.registerComponent("YourAppName", () => App);

export default function App() {
  let [fontsLoaded] = useFonts({
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return;
  } else {
    return (
      <UserContextProvider>
        <Routes />
      </UserContextProvider>
    );
  }
}
