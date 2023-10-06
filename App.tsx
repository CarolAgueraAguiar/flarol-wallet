import { useFonts } from "expo-font";
import UserContextProvider from "./src/context/UserContext";
import { Routes } from "./src/routes/routes";
import { AppRegistry } from "react-native";
import { ToastProvider } from "react-native-toast-notifications";

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
        <ToastProvider
          placement="bottom"
          duration={5000}
          animationType="slide-in"
          animationDuration={250}
          successColor="green"
          dangerColor="red"
          warningColor="orange"
          normalColor="gray"
        >
          <Routes />
        </ToastProvider>
      </UserContextProvider>
    );
  }
}
