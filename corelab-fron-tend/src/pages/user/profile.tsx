import { useContext, useEffect, useState } from 'react';
import axiosInstance from '../../config/api';
import cleanToken from '../../utils/cleanToken';
import styles from './index.module.scss';
import { UpdateForm } from '../../components/form/update/UpdateForm';
import { IUser } from '../../interface/user/user';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

export default function ProfileScreen() {
  const context = useContext(UserContext);
  const { authenticated, deleteUser } = context || {};

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

  const token = localStorage.getItem('token') || '';
  const newToken = cleanToken(token);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (deleteUser) {
      deleteUser(newToken);
    }
  }

  useEffect(() => {
    if (authenticated) {
      axiosInstance
        .get('/user', {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        })
        .then((response) => {
          setUser(response.data as IUser);
        });
    }
  }, [authenticated, newToken]);

  if (!authenticated) {
    return (
      <section className={styles.main__container}>
        <div className={styles.main__container__content}>
          <h1>Acesso Negado</h1>
          <p>Você precisa estar autenticado para acessar esta página.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.main__container}>
      <div className={styles.main__container__content}>
        <h1>Página do usuário</h1>
        <section className={styles.main__container__content__links}>
          <Link className={styles.input__tasks} to={'/tasks'}>
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
