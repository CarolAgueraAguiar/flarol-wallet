import { StyleSheet, Text, View } from "react-native";
import { Plants } from "../../../assets/svg/Plants";
import { Wallet } from "../../../assets/svg/Wallet";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { theme } from "../../styles/theme";
import { ButtonCategory } from "../../components/ButtonCategory/ButtonCategory";
import { WalletIcon } from "../../../assets/svg/WalletIcon";
import { BankIcon } from "../../../assets/svg/Bank";
import { CategoryIcon } from "../../../assets/svg/Category";

export const Home = ({ navigation }: any) => {
  const context = useContext(UserContext);

  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text style={{ color: "#fff", fontSize: 24, fontWeight: "600" }}>
            Seja bem-vindo(a)
          </Text>
          <Text style={{ color: "#efefef" }}>
            <Text style={{ fontWeight: "700" }}>{context?.user.name}</Text>
          </Text>
        </View>
        <Plants />
      </View>
      <View style={styles.wallet}>
        <View>
          <Text style={{ color: "#000", fontSize: 20, fontWeight: "700" }}>
            Saldo das Carteira
          </Text>
          <Text style={{ paddingTop: 5 }}>
            R$ <Text style={{ fontWeight: "700" }}>0,00</Text>
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
          <Text style={{ color: "#000", fontSize: 20, fontWeight: "700" }}>
            Visão geral do mês
          </Text>
          <Text>Set, 23</Text>
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
            padding: 24,
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
            onClick={() => navigation.navigate("Wallet")}
            categoryName="Receitas"
            icon={<BankIcon />}
            color={theme.colorsSecondary.green[400]}
          />
          <ButtonCategory
            onClick={() => navigation.navigate("Wallet")}
            categoryName="Despesas"
            icon={<BankIcon />}
            color="#d3465c"
          />
          <ButtonCategory
            onClick={() => navigation.navigate("Categoria")}
            categoryName="Categorias"
            icon={<CategoryIcon />}
            color="#bdc30f"
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
    backgroundColor: "#D9E7E5",
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
    backgroundColor: "#F4F6F6",
    height: "70%",
  },
  text: {
    color: "#000",
    fontSize: 16,
    fontWeight: "700",
    padding: 24,
  },
});
