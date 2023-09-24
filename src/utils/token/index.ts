import * as SecureStore from "expo-secure-store";

export const saveSessionToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync("sessionToken", token);
  } catch (error) {
    return error;
  }
};

export const getSessionToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("sessionToken");
    if (token !== null) {
      return token;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
export const removeSessionToken = async () => {
  try {
    await SecureStore.deleteItemAsync("sessionToken");
    // console.log("Token de sessão removido com sucesso.");
  } catch (error) {
    // console.error("Erro ao remover o token de sessão:", error);
  }
};
