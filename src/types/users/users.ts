export type StoreUsersProps = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export type UpdateUsersProps = {
  name: string;
  email: string;
  password?: string;
  confirm_password?: string;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type GetUserProps = {
  name: string;
  email: string;
};

export type LoginResponse = {
  id: number;
  email: string;
  name: string;
  token: string;
};
