import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { colors, theme } from "../styles/theme";
import { Home } from "../templates/Home/Home";
import WelcomeScreen from "../templates/Welcome/Welcome";
import { SignUp } from "../templates/SignUp/SignUp";
import { Login } from "../templates/Login/Login";
import { ListWallet } from "../templates/Wallet/ListWallet";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import * as SplashScreen from "expo-splash-screen";
import { AddWallet } from "../templates/Wallet/AddWallet";
import { UpdateWallet } from "../templates/Wallet/UpdateWallet";
import { ListCategory } from "../templates/Category/ListCategory";
import { AddCategory } from "../templates/Category/AddCategory";
import { UpdateCategory } from "../templates/Category/UpdateCategory";
import { ListUser } from "../templates/User/ListUser";
import Greeting from "../components/Header/Greeting";
import { Button, Text } from "react-native";
import { AddIncome } from "../templates/Transactions/Income/AddIncome";
import { AddExpenses } from "../templates/Transactions/Expenses/AddExpenses";
import { ListExpenses } from "../templates/Transactions/Expenses/ListExpenses";
import { UpdateExpenses } from "../templates/Transactions/Expenses/UpdateExpenses";

const { Navigator, Screen, Group } = createStackNavigator();

export const Routes = () => {
  const { isAuthenticated, user, logout } = useContext(UserContext);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [isAuthenticated]);

  return (
    <NavigationContainer theme={theme}>
      <Navigator
        initialRouteName={isAuthenticated ? "Home" : "Welcome"}
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.graylight,
            borderBottomWidth: 0,
            shadowColor: "transparent",
            shadowOpacity: 0,
            elevation: 0,
            height: 120,
          },
          headerTintColor: colors.secondary,
          headerRightContainerStyle: {
            paddingRight: 10,
          },
          headerLeftContainerStyle: {
            paddingLeft: 10,
          },
          headerRight: () => <></>,
        }}
      >
        {isAuthenticated ? (
          <Group>
            <Screen
              name="Home"
              component={Home}
              options={{
                headerTitle: (props) => (
                  <Greeting
                    mainText={`Olá ${user.name}`}
                    subText="Bem vindo de volta"
                    {...props}
                  />
                ),
                headerLeft: () => <></>,
              }}
            />
            <Group screenOptions={{ headerShown: true }}>
              <Screen name="Carteira" component={ListWallet} />
              <Screen
                name="AdicionarCarteira"
                options={{
                  headerTitle: "",
                  headerRight: () => <Text>Adicionar Carteira</Text>,
                }}
                component={AddWallet}
              />
              <Screen name="AtualizarCarteira" component={UpdateWallet} />
            </Group>
            <Group screenOptions={{ headerShown: true }}>
              <Screen name="Categoria" component={ListCategory} />
              <Screen
                name="AdicionarCategoria"
                options={{
                  headerTitle: "",
                  headerRight: () => <Text>Adicionar Categoria</Text>,
                }}
                component={AddCategory}
              />
              <Screen
                name="AtualizarCategoria"
                options={{
                  headerTitle: "",
                  headerRight: () => <Text>Atualizar Categoria</Text>,
                }}
                component={UpdateCategory}
              />
            </Group>
            <Group screenOptions={{ headerShown: true }}>
              <Screen
                name="Usuario"
                component={ListUser}
                options={{
                  headerRight: () => (
                    <Button
                      title="Sair"
                      onPress={() => logout()}
                      color={theme.colors.notification}
                      accessibilityLabel="Sair"
                    />
                  ),
                }}
              />
            </Group>
            <Group screenOptions={{ headerShown: true }}>
              <Screen
                name="Income"
                component={AddIncome}
                options={{
                  headerStyle: {
                    backgroundColor: "#63a195",
                    borderBottomWidth: 0,
                    shadowColor: "transparent",
                    shadowOpacity: 0,
                    elevation: 0,
                    height: 120,
                  },
                  headerTintColor: "#fff",
                  headerTitle: "Receita",
                }}
              />
            </Group>
            <Group screenOptions={{ headerShown: true }}>
              <Screen
                name="Expenses"
                component={ListExpenses}
                options={{
                  headerStyle: {
                    backgroundColor: "#e07d8c",
                    borderBottomWidth: 0,
                    shadowColor: "transparent",
                    shadowOpacity: 0,
                    elevation: 0,
                    height: 120,
                  },
                  headerTintColor: "#fff",
                  headerTitle: "Despesas",
                }}
              />
              <Screen
                name="AddExpenses"
                component={AddExpenses}
                options={{
                  headerStyle: {
                    backgroundColor: "#e07d8c",
                    borderBottomWidth: 0,
                    shadowColor: "transparent",
                    shadowOpacity: 0,
                    elevation: 0,
                    height: 120,
                  },
                  headerTintColor: "#fff",
                  headerTitle: "Despesas",
                }}
              />
              <Screen
                name="UpdateExpenses"
                component={UpdateExpenses}
                options={{
                  headerStyle: {
                    backgroundColor: "#e07d8c",
                    borderBottomWidth: 0,
                    shadowColor: "transparent",
                    shadowOpacity: 0,
                    elevation: 0,
                    height: 120,
                  },
                  headerTintColor: "#fff",
                  headerTitle: "Despesas",
                }}
              />
            </Group>
          </Group>
        ) : (
          <Group screenOptions={{ headerShown: false }}>
            <Screen name="Welcome" component={WelcomeScreen} />
            <Screen name="Cadastrar" component={SignUp} />
            <Screen name="Login" component={Login} />
          </Group>
        )}
      </Navigator>
    </NavigationContainer>
  );
};
