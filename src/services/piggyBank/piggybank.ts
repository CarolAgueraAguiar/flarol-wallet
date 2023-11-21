import { StorePiggyBank } from "../../types/piggyBank/piggybank";
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

export const showCategories = async (id: number): Promise<any> => {
  try {
    const { data } = await axiosFlarol.get(`piggy/${id}`);

    return data;
  } catch (e: any) {
    return e;
  }
};
