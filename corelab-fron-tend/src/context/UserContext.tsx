import { createContext, ReactNode } from 'react';
import useAuth from '../hooks/useAuth';
import { ILogin, IUserCreate } from '../interface/user/user';

interface IUserContext {
  register: (user: IUserCreate) => Promise<any>;
  login: (credentials: ILogin) => Promise<any>;
  logout: () => void;
  authenticated: boolean;
  update: (user: IUserCreate) => Promise<any>;
  deleteUser: (token: string) => Promise<void>;
}

const UserContext = createContext<IUserContext | null>(null);

type UserProviderProps = {
  children: ReactNode;
};

function UserProvider({ children }: UserProviderProps) {
  const { authenticated, register, login, logout, update, deleteUser } = useAuth();

  return (
    <UserContext.Provider value={{ authenticated, register, login, logout, update, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
