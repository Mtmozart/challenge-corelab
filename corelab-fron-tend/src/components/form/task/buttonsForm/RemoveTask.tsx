import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './favorite.module.scss';
import axiosInstance from '../../../../config/api';
import useMessage from '../../../../hooks/useMessage';
import axios from 'axios';

interface RemoveTaskProps {
  id: string | undefined;
}

const RemoveTaskButton: React.FC<RemoveTaskProps> = ({ id }) => {
  const { setMessage } = useMessage();
  let msgText = 'Task deletada';
  let msgType = 'success';
  const handleClick = async () => {
    try {
      await axiosInstance.delete(`/task/${id}/`);
      window.location.reload();
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        msgText = error.response?.data?.message || 'Unknown error';
        msgType = 'error';
      } else {
        msgText = error.response?.data?.message;
        msgType = 'error';
      }
    } finally {
      setMessage(msgText, msgType);
    }
  };

  return (
    <button onClick={handleClick} className={styles.button} aria-label={'Deletar task'}>
      <AiOutlineClose size={30} color="red" />
    </button>
  );
};

export default RemoveTaskButton;
