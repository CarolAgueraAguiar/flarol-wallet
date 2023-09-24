import axios from "axios";
import { getSessionToken } from "../../utils/token";

export type StoreWalletsProps = {
  userId: string;
  description: string;
  amount: string;
};

export const storeWallets = async ({
  userId,
  description,
  amount,
}: StoreWalletsProps) => {
  try {
    const token = await getSessionToken();
    const { data } = await axios.post(
      "http://localhost:3000/wallets",
      {
        userId: Number(userId),
        description,
        amount: Number(amount),
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (e: any) {
    return e;
  }
};

export type ListWalletsProps = {
  id: number;
  description: string;
  slug: string;
  amount: number;
  user_id: number;
};

export const listWallets = async (): Promise<ListWalletsProps[]> => {
  try {
    const token = await getSessionToken();

    const { data } = await axios.get("http://localhost:3000/wallets", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (e: any) {
    return e;
  }
};
