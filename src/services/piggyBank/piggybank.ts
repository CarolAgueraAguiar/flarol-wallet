import {
  ShowPiggyBank,
  StorePiggyBank,
  UpdatePiggyBankProps,
} from "../../types/piggyBank/piggybank";
import { axiosFlarol } from "../axios";
import { ReturnError } from "../users/users";

export const storePiggyBank = async ({
  name,
  wallet_id,
  final_date,
  final_amount,
  initial_value,
}: StorePiggyBank): Promise<[number | null, ReturnError | null]> => {
  try {
    const { status } = await axiosFlarol.post<StorePiggyBank>("piggy", {
      name,
      wallet_id,
      final_date,
      final_amount,
      initial_value,
    });

    return [status, null];
  } catch (e: any) {
    return [null, e.response.data];
  }
};

export const listPiggyBank = async () => {
  try {
    const { data } = await axiosFlarol.get("piggy");

    return [data, null];
  } catch (e: any) {
    return [null, e.response.data];
  }
};

export const showPiggyBank = async (
  id: number
): Promise<[ShowPiggyBank | null, ReturnError | null]> => {
  try {
    const { data } = await axiosFlarol.get<ShowPiggyBank>(`piggy/${id}`);

    return [data, null];
  } catch (e: any) {
    return [null, e.response.data];
  }
};

export const updatePiggyBank = async ({
  id,
  name,
  final_amount,
  final_date,
}: UpdatePiggyBankProps): Promise<[number | null, ReturnError | null]> => {
  try {
    const { status } = await axiosFlarol.put<UpdatePiggyBankProps>(
      `categories/${id}`,
      {
        name,
        final_amount,
        final_date,
      }
    );

    return [status, null];
  } catch (e: any) {
    return [null, e];
  }
};
