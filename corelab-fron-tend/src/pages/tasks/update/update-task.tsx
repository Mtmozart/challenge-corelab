import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
import axiosInstance from '../../../config/api';
import { ITaskCRrated } from '../../../interface/task';
import { UpdateTaskForm } from '../../../components/form/task/update-task/UpdateTaskForm';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext';
import cleanToken from '../../../utils/cleanToken';

export default function UpdateTaskScreen() {
  const { id } = useParams<{ id: string }>();
  const [task, setTask] = useState<ITaskCRrated | null>(null);
  const [error, setError] = useState<string | null>(null);
  const context = useContext(UserContext);
  const [token] = useState(localStorage.getItem('token') || '');

  const newToken = cleanToken(token);
  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/task/${id}`, {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        })
        .then((response) => {
          setTask(response.data as ITaskCRrated);
          setError(null);
        })
        .catch((error) => {
          console.error('Error fetching task data:', error);
          setError('Erro ao buscar dados da tarefa.');
        });
    }
  }, [id, token]);

  if (!context?.authenticated) {
    return (
      <section className={styles.access_denied}>
        <h1>Acesso Negado</h1>
        <p>Você precisa estar autenticado para acessar esta página.</p>
      </section>
    );
  }

  return (
    <section className={styles.main__container__task}>
      <section className={styles.main__container__task__content}>
        <div className={styles.container__task__your__task}>
          <h2>Atualizar Task</h2>
          {error ? (
            <p className={styles.error_message}>{error}</p>
          ) : task ? (
            <UpdateTaskForm task={task} />
          ) : (
            <p>Carregando...</p>
          )}
        </div>
      </section>
    </section>
  );
}
