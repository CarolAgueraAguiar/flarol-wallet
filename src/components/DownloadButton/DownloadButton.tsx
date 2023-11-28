import { Platform, TouchableOpacity, Text } from "react-native";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { ExportPlanilha } from "../../../assets/svg/ExportPlanilha";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { env } from "../../config/env";

export type DownloadButtonProps = {
  walletId: number;
  startDate: string;
  endDate: string;
};

export const DownloadButton = ({
  walletId,
  startDate,
  endDate,
}: DownloadButtonProps) => {
  const { user } = useContext(UserContext);

  const downloadFromAPI = async () => {
    const filename = "Planilha.xlsx";
    const localhost = Platform.OS === "android" ? "10.0.2.2" : "127.0.0.1";
    const result = await FileSystem.downloadAsync(
      `${env.baseUrl}export-data?start_date=${startDate}&end_date=${endDate}&wallet_id=${walletId}`,
      FileSystem.documentDirectory + filename,
      {
        headers: {
          MyHeader: "MyValue",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    save(result.uri, filename, result.headers["Content-Type"]);
  };

  const save = async (uri: any, filename: any, mimetype: any) => {
    if (Platform.OS === "android") {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          filename,
          mimetype
        )
          .then(async (uri) => {
            await FileSystem.writeAsStringAsync(uri, base64, {
              encoding: FileSystem.EncodingType.Base64,
            });
          })
          .catch((e) => console.log(e));
      } else {
        shareAsync(uri);
      }
    } else {
      shareAsync(uri);
    }
  };

  return (
    <TouchableOpacity
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: 50,
        backgroundColor: "#1e668a",
        borderRadius: 24,
        justifyContent: "center",
        flexDirection: "row",
      }}
      onPress={downloadFromAPI}
    >
      <ExportPlanilha />
      <Text style={{ color: "#fff", fontWeight: "600", marginLeft: 10 }}>
        Exportar Planilha
      </Text>
    </TouchableOpacity>
  );
};
