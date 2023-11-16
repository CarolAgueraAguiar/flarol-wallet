import {
  GetTransactionProps,
  StoreTransactionProps,
  UpdateTransactionProps,
} from "../../types/transactions/transactions";
import { axiosFlarol } from "../axios";
import { ReturnError } from "../users/users";

export const createTransaction = async ({
  amount,
  description,
  date,
  status,
  installment,
  period,
  walletId,
  categoryId,
}: StoreTransactionProps): Promise<[number | null, ReturnError | null]> => {
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

    return [response.status, null];
  } catch (e: any) {
    return [null, e.response.data as ReturnError];
  }
};

export const listExpenses = async (): Promise<GetTransactionProps[]> => {
  try {
    const { data } = await axiosFlarol.get<GetTransactionProps[]>(
      "transactions?type=despesa"
    );

    return data;
  } catch (e: any) {
    return e;
  }
};

export const listIncomes = async (): Promise<GetTransactionProps[]> => {
  try {
    const { data } = await axiosFlarol.get<GetTransactionProps[]>(
      "transactions?type=receita"
    );

    return data;
  } catch (e: any) {
    return e;
  }
};
export const showTransaction = async (
  id: number,
  walletId: number
): Promise<GetTransactionProps> => {
  try {
    const { data } = await axiosFlarol.get<GetTransactionProps>(
      `transactions/${walletId}/${id}`
    );

    return data;
  } catch (e: any) {
    return e;
  }
};

export const updateTransaction = async ({
  id,
  walletIdOld,
  amount,
  description,
  date,
  status,
  installment,
  period,
  walletId,
  categoryId,
}: UpdateTransactionProps): Promise<number> => {
  try {
    const response = await axiosFlarol.put<StoreTransactionProps>(
      `transactions/${walletIdOld}/${id}`,
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
