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
}: LoginProps): Promise<LoginResponse> => {
  try {
    const { data } = await axiosFlarol.post<LoginResponse>("users/login", {
      email,
      password,
    });

    return data;
  } catch (e: any) {
    return e.response.data;
  }
};

export const storeUsers = async ({
  name,
  email,
  password,
  confirm_password,
}: StoreUsersProps): Promise<number> => {
  try {
    const response = await axiosFlarol.post("users", {
      name,
      email,
      password,
      confirm_password,
    });
    console.log(response);

    return response.status;
  } catch (e: any) {
    console.log(e.response);
    return e;
  }
};

export const updateUser = async (props: UpdateUsersProps): Promise<number> => {
  console.log({ props });

  try {
    const { status } = await axiosFlarol.put("users", {
      props,
    });

    return status;
  } catch (e: any) {
    console.log(e.response.data);

    return e;
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
