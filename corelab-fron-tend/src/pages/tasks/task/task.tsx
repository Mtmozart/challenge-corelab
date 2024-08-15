import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import axiosInstance from '../../../config/api';
import { TaskCard } from '../../../components/task-card/TaskCard';
import { ITask } from '../../../interface/task';
import { UserContext } from '../../../context/UserContext';

export default function TaskScreen() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<ITask | null>(null);
  const context = useContext(UserContext);

  useEffect(() => {
    if (id && context?.authenticated) {
      axiosInstance
        .get(`/task/${id}`)
        .then((response) => {
          setTask(response.data as ITask);
        })
        .catch((error) => {
          console.error('Error fetching task data:', error);
        });
    }
  }, [id, context?.authenticated]);

  if (!context?.authenticated) {
    return (
      <section className={styles.main__container__task__acesso__negado}>
        <h1>Acesso Negado</h1>
        <p>Você precisa estar autenticado para acessar esta página.</p>
      </section>
    );
  }

  return (
    <section className={styles.main__container__task}>
      <section className={styles.main__container__task__content}>
        <div className={styles.container__task__your__task}>
          {task ? <TaskCard task={task} /> : <div>Loading...</div>}
        </div>
      </section>
    </section>
  );
}
