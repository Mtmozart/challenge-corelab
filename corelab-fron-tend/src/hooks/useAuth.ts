import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/api';
import { IUserCreate } from '../interface/user/user';
import axios from 'axios';
import useMessage from './useMessage';

export default function useAuth() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const { setMessage } = useMessage();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axiosInstance.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);

  async function register(user: IUserCreate) {
    let msgText = 'Cadastro realizado com sucesso!';
    let msgType = 'success';
    try {
      const data: any = await axiosInstance.post('user', user).then((response) => {
        return data;
      });
      await authUser(data);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        msgText = error.response?.data?.message || 'Unknown error';
        msgType = 'error';
      } 
      msgText = error.response?.data?.message;
      msgType = 'error';
    }
    setMessage(msgText, msgType);
  }

  async function authUser(data: Promise<String>) {
    setAuthenticated(true);
    localStorage.setItem('token', JSON.stringify(data));
    navigate('/');
  }

  return { authenticated, register };
}
