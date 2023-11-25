import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import { Decoration } from "../../../assets/svg/Decoration";
import { CircleIcon } from "../../../assets/svg/CircleIcon";
import { Add } from "../../../assets/svg/Add";
import { PiggyBank } from "../../../assets/svg/PiggyBank";
import { PiggyBank2 } from "../../../assets/svg/PiggyBank2";
import { listPiggyBank } from "../../services/piggyBank/piggybank";
import { ListPiggyBank, StorePiggyBank } from "../../types/piggyBank/piggybank";
import { useToast } from "react-native-toast-notifications";
import { formatarDataTimeStamp } from "../../utils/Date";
import { useIsFocused } from "@react-navigation/native";

interface PiggyBank {
  current: number;
  goal: number;
  progress: number;
  final_date: string;
  name: string;
}

const PiggyBankCard: React.FC<PiggyBank> = ({
  current,
  goal,
  progress,
  final_date,
  name,
}) => {
  let color = "#6200ee";

  if (progress < 0.3) {
    color = "#ff0000"; // vermelho para menos de 30%
  } else if (progress < 0.6) {
    color = "#ffaa00"; // laranja para menos de 60%
  } else if (progress < 1) {
    color = "#ffff00"; // amarelo para menos de 100%
  } else {
    color = "#00ff00"; // verde para 100% ou mais
  }

  const currentDate = new Date();
  const finalDate = new Date(final_date);
  const timeDifference = finalDate.getTime() - currentDate.getTime();

  const daysDifference = timeDifference / (1000 * 3600 * 24);
  let colorDate = "#6200ee";

  if (daysDifference <= 7) {
    colorDate = "#aa0e0e"; // vermelho para menos de 7 dias
  } else if (daysDifference <= 14) {
    colorDate = "#ffaa00"; // laranja para menos de 14 dias
  } else if (daysDifference <= 30) {
    colorDate = "#ffff00"; // amarelo para menos de 30 dias
  } else {
    colorDate = "#00ff00"; // verde para mais de 30 dias
  }

  const piggyBankPosition = (progress * 93).toString() + "%";

  return (
    <View style={styles.card}>
      <View style={styles.title}>
        <Text style={{ color: "#e2e2e2", fontWeight: "800", fontSize: 18 }}>
          {name}
        </Text>
        <Text style={{ color: colorDate, fontWeight: "700", fontSize: 15 }}>
          {formatarDataTimeStamp(final_date)}
        </Text>
      </View>
      <View style={styles.title}>
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 17 }}>
          R${current}
        </Text>
        <Text style={{ color: color, fontWeight: "700", fontSize: 17 }}>
          R${goal}
        </Text>
      </View>
      <ProgressBar
        progress={progress}
        color={color}
        style={{ marginBottom: 5 }}
      />
      <PiggyBank2 color={color} style={{ left: piggyBankPosition }} />
    </View>
  );
};

const PiggyBankScreen: React.FC = ({ navigation }: any) => {
  const [piggyBanks, setPiggyBanks] = useState<ListPiggyBank[]>([]);
  const toast = useToast();
  const isFocused = useIsFocused();

  const listPiggys = async () => {
    const [piggyBanks, error] = await listPiggyBank();

    if (error) {
      toast.show("Erro ao listar Porquinhos", {
        type: "danger",
      });
      return;
    }

    setPiggyBanks(piggyBanks);
  };

  const onNavigation = (id: number) => {
    navigation.navigate("EditarPorquinho", {
      id,
    });
  };

  useEffect(() => {
    if (isFocused) {
      listPiggys();
    }
  }, [isFocused]);

  return (
    <FlatList
      data={piggyBanks}
      keyExtractor={(item) => String(item.id)}
      ListHeaderComponent={() => (
        <View>
          <View style={styles.container}>
            <Text style={styles.text}>Porquinho</Text>
            <PiggyBank />
            <View style={{ position: "absolute", top: 0, right: 0 }}>
              <Decoration />
            </View>
            <View style={{ position: "absolute", bottom: 0, left: 0 }}>
              <CircleIcon />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("AdicionarPorquinho")}
            style={{ display: "flex", alignItems: "center", margin: 12 }}
          >
            <View style={styles.buttonAdd}>
              <Add />
              <Text
                style={{ marginLeft: 10, color: "#fff", fontWeight: "600" }}
              >
                Adicionar
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={styles.containerContent}
          onPress={() => onNavigation(item.id)}
        >
          <PiggyBankCard
            key={index}
            current={item.amount}
            goal={item.final_amount}
            progress={item.progress}
            final_date={item.final_date}
            name={item.name}
          />
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    borderRadius: 24,
    lineHeight: 1.25,
    padding: 24,
    margin: 12,
    height: 150,
    backgroundColor: "#5577A5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 12,
    alignItems: "center",
  },
  containerContent: {
    backgroundColor: "#5576a5d5",
    margin: 12,
    borderRadius: 10,
  },
  card: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 10,
    padding: 12,
  },
  buttonAdd: {
    borderRadius: 100,
    height: 40,
    width: "100%",
    backgroundColor: "green",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",

    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: "#fff",
    borderTopColor: "white",
  },
  text: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 30,
  },
});

export default PiggyBankScreen;
