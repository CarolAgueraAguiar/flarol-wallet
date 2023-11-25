export interface StorePiggyBank {
  name: string;
  final_date: string;
  final_amount: number;
  initial_value: number;
  wallet_id: number;
}

export interface UpdatePiggyBankProps {
  id: number;
  name: string;
  final_date: string;
  final_amount: number;
}

export interface ListPiggyBank {
  amount: number;
  final_amount: number;
  final_date: string;
  id: number;
  name: string;
  progress: number;
}

export interface ShowPiggyBank {
  piggy: Piggy;
  transactions: Transaction[];
}

export interface Piggy {
  id: number;
  name: string;
  final_date: string;
  final_amount: number;
  amount: number;
  user_id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface Transaction {
  id: number;
  description: string;
  date: string;
  amount: number;
  status: string;
  transaction_code: string;
  note: any;
  wallet_id: any;
  piggy_bank_id: number;
  category_id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: any;
}

export interface WithdrawPiggyBank {
  amount: number;
  piggy_id: number;
  wallet_id: number;
}
