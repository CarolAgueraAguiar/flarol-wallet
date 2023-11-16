import { TransactionStatus } from "../../enum/TransactionStatus";
import { Icon } from "../categories/categories";

export type StoreTransactionProps = {
  amount: number;
  description: string;
  date: string;
  status: TransactionStatus;
  installment: number;
  period: number;
  walletId: number;
  categoryId: number;
};

export type UpdateTransactionProps = {
  id: number;
  walletIdOld: number;
} & StoreTransactionProps;

export interface GetTransactionProps {
  id: number;
  description: string;
  date: string;
  amount: number;
  status: string;
  transaction_code: string;
  note: any;
  wallet_id: number;
  category_id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  category: Category;
  wallet: Wallet;
}

export interface Category {
  id: number;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
  user_id: number;
  icon_id: number;
  icon: Icon;
}

export interface Wallet {
  id: number;
  description: string;
  slug: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  user_id: number;
}
