import { createContext, ReactNode } from 'react';
import useAuth from '../hooks/useAuth';
import { IUserCreate } from '../interface/user/user';

const UserContext = createContext<{ register: (user: IUserCreate) => Promise<any> } | null>(null);

type UserProviderProps = {
  children: ReactNode;
};

function UserProvider({ children }: UserProviderProps) {
  const { register } = useAuth();
  // const { cookie, acceptCookie } = useCookies(); // Remova ou ajuste conforme necessário

  return <UserContext.Provider value={{ register }}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };
