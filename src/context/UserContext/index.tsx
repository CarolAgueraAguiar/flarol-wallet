import { ReactNode, createContext, useEffect, useState } from "react";

interface User {
  id?: number;
  name: string;
  email: string;
  token: string;
}

interface MeuContextoType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isAuthenticated: boolean;
}

interface MeuContextoProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<MeuContextoType>(
  {} as MeuContextoType
);

function UserContextProvider({ children }: MeuContextoProviderProps) {
  const [user, setUser] = useState<User>({ name: "", email: "", token: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user && user.token) {
      setIsAuthenticated(true);
      return;
    }
    setIsAuthenticated(false);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
