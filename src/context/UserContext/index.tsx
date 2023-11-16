import { ReactNode, createContext, useEffect, useState } from "react";

interface User {
  id?: number;
  name: string;
  email: string;
  token: string;
  hasWallet: boolean;
}

interface MeuContextoType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isAuthenticated: boolean;
  logout: () => void;
  setWalletAmount: React.Dispatch<React.SetStateAction<number>>;
  walletAmount: number;
}

interface MeuContextoProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<MeuContextoType>(
  {} as MeuContextoType
);

function UserContextProvider({ children }: MeuContextoProviderProps) {
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    token: "",
    hasWallet: false,
  });
  const [walletAmount, setWalletAmount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setUser({ name: "", email: "", token: "", hasWallet: false });
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (user && user.token) {
      setIsAuthenticated(true);
      return;
    }
    setIsAuthenticated(false);
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        logout,
        setWalletAmount,
        walletAmount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
