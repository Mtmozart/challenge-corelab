import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import styles from './favorite.module.scss';
import axiosInstance from '../../../../config/api';
import useMessage from '../../../../hooks/useMessage';
import axios from 'axios';

interface FavoriteButtonProps {
  id: string | undefined;
  initialFavoriteStatus: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ id, initialFavoriteStatus }) => {
  const [isFavorite, setIsFavorite] = useState(initialFavoriteStatus);
  const { setMessage } = useMessage();

  const handleClick = async () => {
    let msgText = '';
    let msgType = '';
    try {
      await axiosInstance.patch(`/task/favorite/${id}/`);
      setIsFavorite((prev) => !prev);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        msgText = error.response?.data?.message || 'Unknown error';
        msgType = 'error';
        setMessage(msgText, msgType);
      } else {
        msgText = error.response?.data?.message;
        msgType = 'error';
        setMessage(msgText, msgType);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={styles.button}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? (
        <AiFillHeart size={30} color="red" />
      ) : (
        <AiOutlineHeart size={30} color="red" />
      )}
    </button>
  );
};

export default FavoriteButton;
