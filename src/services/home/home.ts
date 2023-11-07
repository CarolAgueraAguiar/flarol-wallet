import { GetHomeProps } from "../../types/home/home";
import { axiosFlarol } from "../axios";

export const listHome = async (): Promise<GetHomeProps> => {
  try {
    const { data } = await axiosFlarol.get("main");

    return data;
  } catch (e: any) {
    return e;
  }
};
