import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/api';
import { ILogin, IUserCreate } from '../interface/user/user';
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
        return response.data;
      });
      await authUser(data.token);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        msgText = error.response?.data?.message || 'Unknown error';
        msgType = 'error';
      } else {
        msgText = error.response?.data?.message;
        msgType = 'error';
      }
    }
    setMessage(msgText, msgType);
  }

  function logout() {
    const msgText = 'Logout Realizado com sucesso';
    const msgType = 'success';
    setAuthenticated(false);
    localStorage.removeItem('token');
    navigate('/');
    setMessage(msgText, msgType);
  }
  async function login(user: ILogin) {
    let msgText = 'Login realizado com sucesso';
    let msgType = 'success';
    try {
      const data = await axiosInstance.post('/auth', user).then((response) => {
        return response.data;
      });
      await authUser(data.token);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        msgText = error.response?.data?.message || 'Unknown error';
        msgType = 'error';
      } else {
        msgText = error.response?.data?.message;
        msgType = 'error';
      }
    }
    setMessage(msgText, msgType);
  }

  async function update(user: IUserCreate) {
    let msgText = 'Atualização realizada com sucesso!';
    let msgType = 'success';
    try {
      const update = await axiosInstance.put('user', user).then((response) => {
        return response.data;
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        msgText = error.response?.data?.message || 'Unknown error';
        msgType = 'error';
      } else {
        msgText = error.response?.data?.message;
        msgType = 'error';
      }
    }
    setMessage(msgText, msgType);
  }

  async function deleteUser(token: string): Promise<void> {
    let msgText = 'Usuário deletado com sucesso';
    let msgType = 'success';

    try {
      await axiosInstance.delete('/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAuthenticated(false);
      localStorage.removeItem('token');
      navigate('/');
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        msgText = error.response?.data?.message || 'Erro desconhecido';
        msgType = 'error';
      } else {
        msgText = 'Erro desconhecido';
        msgType = 'error';
      }
    }
    setMessage(msgText, msgType);
  }
  async function authUser(data: Promise<String>) {
    const token = await data;
    setAuthenticated(true);
    localStorage.setItem('token', JSON.stringify(token));
    navigate('/');
  }

  return { authenticated, register, logout, login, update, deleteUser };
}
