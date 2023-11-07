import {
  GetTransactionProps,
  StoreTransactionProps,
} from "../../types/transactions/transactions";
import { axiosFlarol } from "../axios";

export const createTransaction = async ({
  amount,
  description,
  date,
  status,
  installment,
  period,
  walletId,
  categoryId,
}: StoreTransactionProps): Promise<number> => {
  try {
    const response = await axiosFlarol.post<StoreTransactionProps>(
      "transactions",
      {
        amount,
        description,
        date,
        status,
        installment,
        period,
        walletId,
        categoryId,
      }
    );

    return response.status;
  } catch (e: any) {
    return e;
  }
};

export const listTransactions = async (): Promise<GetTransactionProps[]> => {
  try {
    const { data } = await axiosFlarol.get<GetTransactionProps[]>(
      "transactions?wallet_id=13&type=despesa"
    );

    return data;
  } catch (e: any) {
    return e;
  }
};

export const showTransaction = async (
  id: number
): Promise<GetTransactionProps> => {
  try {
    const { data } = await axiosFlarol.get<GetTransactionProps>(
      `transactions/13/${id}`
    );

    return data;
  } catch (e: any) {
    return e;
  }
};

export const updateTransaction = async ({
  amount,
  description,
  date,
  status,
  installment,
  period,
  walletId,
  categoryId,
}: StoreTransactionProps): Promise<number> => {
  try {
    const response = await axiosFlarol.put<StoreTransactionProps>(
      "transactions",
      {
        amount,
        description,
        date,
        status,
        installment,
        period,
        walletId,
        categoryId,
      }
    );

    return response.status;
  } catch (e: any) {
    return e;
  }
};
