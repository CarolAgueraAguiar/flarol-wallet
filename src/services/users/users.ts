import {
  GetUserProps,
  LoginProps,
  LoginResponse,
  StoreUsersProps,
  UpdateUsersProps,
} from "../../types/users/users";
import { axiosFlarol } from "../axios";

export const login = async ({
  email,
  password,
}: LoginProps): Promise<[LoginResponse | null, ReturnError | null]> => {
  try {
    const { data } = await axiosFlarol.post<LoginResponse>("users/login", {
      email,
      password,
    });

    return [data, null];
  } catch (e: any) {
    return [null, e.response.data as ReturnError];
  }
};

type ReturnErrorMessage = {
  error: string;
  field: string;
};

export type ReturnError = {
  error: string;
  message: ReturnErrorMessage[];
  statusCode: number;
};

export const storeUsers = async ({
  name,
  email,
  password,
  confirm_password,
}: StoreUsersProps): Promise<[number | null, ReturnError | null]> => {
  try {
    const response = await axiosFlarol.post("users", {
      name,
      email,
      password,
      confirm_password,
    });

    return [response.status, null];
  } catch (e: any) {
    return [null, e.response.data as ReturnError];
  }
};

export const updateUser = async (
  props: UpdateUsersProps
): Promise<[number | null, ReturnError | null]> => {
  try {
    const { status } = await axiosFlarol.put("users", {
      props,
    });

    return [status, null];
  } catch (e: any) {
    return [null, e.response.data as ReturnError];
  }
};

export const getUser = async (): Promise<GetUserProps> => {
  try {
    const { data } = await axiosFlarol.get<GetUserProps>("users");

    return data;
  } catch (e: any) {
    return e;
  }
};

export const deleteUser = async (): Promise<GetUserProps> => {
  try {
    const { data } = await axiosFlarol.delete<GetUserProps>("users");

    return data;
  } catch (e: any) {
    return e;
  }
};
