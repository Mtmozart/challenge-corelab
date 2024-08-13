import { IAddress } from '../address';

export interface IUserCreate {
  name: string;
  email: string;
  username: string;
  password: string;
  address: IAddress;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  address: IAddress;
}
