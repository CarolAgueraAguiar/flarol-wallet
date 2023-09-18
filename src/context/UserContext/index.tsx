import { ReactNode, createContext, useState } from "react";

interface User {
  name: string;
  email: string;
  token: string;
}

interface MeuContextoType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

interface MeuContextoProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<MeuContextoType | undefined>(
  undefined
);

function UserContextProvider({ children }: MeuContextoProviderProps) {
  const [user, setUser] = useState<User>({ name: "", email: "", token: "" });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
