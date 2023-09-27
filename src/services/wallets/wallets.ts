import {
  ListWalletsProps,
  StoreWalletsProps,
  UpdateWalletsProps,
} from "../../types/wallets/wallets";
import { axiosFlarol } from "../axios";

export const storeWallets = async ({
  description,
  amount,
}: StoreWalletsProps) => {
  try {
    const { data } = await axiosFlarol.post("wallets", {
      description,
      amount: Number(amount),
    });
    return data;
  } catch (e: any) {
    return e;
  }
};

export const listWallets = async (): Promise<ListWalletsProps[]> => {
  try {
    const { data } = await axiosFlarol.get("wallets");

    return data;
  } catch (e: any) {
    return e;
  }
};

export const showWallet = async (id: number): Promise<ListWalletsProps> => {
  try {
    const { data } = await axiosFlarol.get(`wallets/${id}`);

    return data;
  } catch (e: any) {
    return e;
  }
};

export const updateWallets = async ({
  description,
  amount,
  id,
}: UpdateWalletsProps) => {
  try {
    const { data } = await axiosFlarol.put(`wallets/${id}`, {
      description,
      amount: Number(amount),
    });
    return data;
  } catch (e: any) {
    return e;
  }
};

export const deleteWallet = async (id: number) => {
  try {
    const { data } = await axiosFlarol.delete(`wallets/${id}`);
    return data;
  } catch (e: any) {
    return e;
  }
};
