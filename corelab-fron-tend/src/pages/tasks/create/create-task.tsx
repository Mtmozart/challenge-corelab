import { useEffect, useState } from 'react';
import { CreateTaskForm } from '../../../components/form/task/create-task/CreateTaskForm';
import styles from './index.module.scss';
import axiosInstance from '../../../config/api';
import { IUser } from '../../../interface/user/user';
import cleanToken from '../../../utils/cleanToken';

export default function CreateTaskScreen() {
  const [user, setUser] = useState<IUser | null>(null);
  const token = localStorage.getItem('token') || '';
  const newToken = cleanToken(token);

  useEffect(() => {
    if (newToken) {
      axiosInstance
        .get('/user', {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        })
        .then((response) => {
          setUser(response.data as IUser);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    }
  }, [newToken]);

  return (
    <section className={styles.main__container__task}>
      <section className={styles.main__container__task__content}>
        <div className={styles.container__task__your__task}>
          <h2>Create Task</h2>
          {user && user.id ? <CreateTaskForm id={user.id} /> : <div>No user data available</div>}
        </div>
      </section>
    </section>
  );
}
