export interface StorePiggyBank {
  name: string;
  final_date: string;
  final_amount: number;
  initial_value: number;
  wallet_id: number;
}

export interface ListPiggyBank {
  amount: number;
  final_amount: number;
  final_date: string;
  id: number;
  name: string;
  progress: number;
}
