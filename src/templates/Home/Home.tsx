import { StyleSheet, Text, View } from "react-native";
import { Plants } from "../../../assets/svg/Plants";
import { Wallet } from "../../../assets/svg/Wallet";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { colors, theme } from "../../styles/theme";
import { ButtonCategory } from "../../components/ButtonCategory/ButtonCategory";
import { WalletIcon } from "../../../assets/svg/WalletIcon";
import { BankIcon } from "../../../assets/svg/Bank";
import { CategoryIcon } from "../../../assets/svg/Category";
import { UserIcon } from "../../../assets/svg/User";
import { ArrowDownIcon } from "../../../assets/svg/ArrowDown";
import { ArrowUpIcon } from "../../../assets/svg/ArrowUp";
import Profile from "../../components/Header/Profile";
import Avi from "../../../assets/avatar.png";
import { listWallets } from "../../services/wallets/wallets";
import { formatNumber } from "../../utils/mask";
import { formatCurrentDate } from "../../utils/Date";

export const Home = ({ navigation }: any) => {
  const context = useContext(UserContext);

  useEffect(() => {
    navigation.removeListener;
    navigation.setOptions({
      headerRight: () => (
        <Profile
          img={Avi}
          imgContainerStyle={{ backgroundColor: colors.tertiary }}
          onPress={() => navigation.navigate("Usuario")}
        />
      ),
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Profile
          img={Avi}
          imgContainerStyle={{ backgroundColor: colors.tertiary }}
          onPress={() => navigation.navigate("Usuario")}
        />
      ),
    });

    const walletsData = async () => {
      let totalAmount = 0;

      const walletData = await listWallets();
      walletData.map((wallet) => {
        const walletAmount = wallet.amount;
        totalAmount += walletAmount;
        context?.setWalletAmount(totalAmount);
      });
    };

    walletsData();
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text style={{ color: "#fff", fontSize: 24, fontWeight: "500" }}>
            Seja bem-vindo(a)
          </Text>
          <Text style={{ color: "#efefef" }}>
            <Text style={{ fontWeight: "600", fontSize: 18 }}>
              {context?.user.name}
            </Text>
          </Text>
        </View>
        <Plants />
      </View>
      <View style={styles.wallet}>
        <View>
          <Text style={{ color: "#000", fontSize: 20, fontWeight: "500" }}>
            Saldo das Carteira
          </Text>
          <Text style={{ paddingTop: 5, fontWeight: "700" }}>
            {formatNumber(String(context?.walletAmount))}
          </Text>
        </View>
        <Wallet />
      </View>
      <View style={styles.saldo}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "500" }}>
            Visão geral do mês
          </Text>
          <Text style={{ color: "#fff" }}>{formatCurrentDate()}</Text>
        </View>
        <View style={styles.receitas}>
          <Text style={styles.textSucefull}>Receitas</Text>
          <Text style={styles.textSucefull}>
            R$ <Text style={{ fontWeight: "700" }}>0,00</Text>
          </Text>
        </View>
        <View style={styles.despesas}>
          <Text style={styles.textDanger}>Despesas</Text>
          <Text style={styles.textDanger}>
            R$ <Text style={{ fontWeight: "700" }}>0,00</Text>
          </Text>
        </View>
      </View>
      <View style={styles.myBudget}>
        <View>
          <Text style={styles.text}>Minha Carteira</Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <ButtonCategory
            onClick={() => navigation.navigate("Carteira")}
            categoryName="Carteiras"
            icon={<WalletIcon />}
            color="#730fc3"
          />
          <ButtonCategory
            onClick={() => navigation.navigate("Income")}
            categoryName="Receitas"
            icon={<ArrowUpIcon />}
            color="#2D6A4F"
          />
          <ButtonCategory
            onClick={() => navigation.navigate("Expenses")}
            categoryName="Despesas"
            icon={<ArrowDownIcon />}
            color="#d3465c"
          />
          <ButtonCategory
            onClick={() => navigation.navigate("Categoria")}
            categoryName="Categorias"
            icon={<CategoryIcon />}
            color="#bdc30f"
          />
          <ButtonCategory
            onClick={() => navigation.navigate("Usuario")}
            categoryName="Usuário"
            icon={<UserIcon />}
            color="#836F81"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textSucefull: {
    color: theme.colorsSecondary.green[300],
  },
  textDanger: {
    color: theme.colors.notification,
  },
  container: {
    borderRadius: 24,
    lineHeight: 1.25,
    paddingLeft: 24,
    margin: 12,
    height: 150,
    backgroundColor: "#81B2CA",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  wallet: {
    borderRadius: 24,
    lineHeight: 1.25,
    flexShrink: 0,
    padding: 24,
    backgroundColor: "#D9E7E5",
    margin: 12,
    marginTop: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  saldo: {
    borderRadius: 24,
    lineHeight: 1.25,
    flexShrink: 0,
    padding: 24,
    backgroundColor: "#242424",
    margin: 12,
    marginTop: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  receitas: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
  },
  despesas: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
  },
  myBudget: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#D9E7E5",
    height: "70%",
  },
  text: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
    padding: 24,
  },
});
