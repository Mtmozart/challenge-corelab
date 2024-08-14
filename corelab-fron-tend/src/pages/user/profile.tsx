import { FormEvent, useContext, useEffect, useState } from 'react';
import axiosInstance from '../../config/api';
import cleanToken from '../../utils/cleanToken';
import styles from './index.module.scss';
import { UpdateForm } from '../../components/form/update/UpdateForm';
import { IUser } from '../../interface/user/user';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export default function ProfileScreen() {
  const [token, authenticated] = useState(localStorage.getItem('token') || '');

  const context = useContext(UserContext);

  const [user, setUser] = useState<IUser>({
    id: '',
    name: '',
    email: '',
    username: '',
    password: '',
    address: {
      id: '',
      cep: '',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      country: '',
      complement: '',
    },
  });

  const newToken = cleanToken(token);
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (context?.deleteUser) {
      context.deleteUser(newToken);
    }
  }
  useEffect(() => {
    axiosInstance
      .get('/user', {
        headers: {
          Authorization: `Bearer ${newToken}`,
        },
      })
      .then((response) => {
        setUser(response.data as IUser);
      });
  }, [token]);

  return (
    <section className={styles.main__container}>
      <div className={styles.main__container__content}>
        <h1>Página do usuário</h1>
        <section className={styles.main__container__content__links}>
          <Link className={styles.input__tasks} to={'/'}>
            tasks
          </Link>
          <Link className={styles.input__deletar} to={'#'} onClick={handleClick}>
            deletar conta
          </Link>
        </section>
        <UpdateForm user={user} />
      </div>
    </section>
  );
}
