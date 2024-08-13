import { ReactNode } from 'react';
import { IUser, IUserCreate } from '../interface/user/user';

export interface IAuthProvider {
  currentUser: IUser | null;
  logout: () => void;
  status: string;
}

export interface IContextProvider {
  children: ReactNode;
}
