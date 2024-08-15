import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './style.module.scss';
import axiosInstance from '../../../../config/api';
import cleanToken from '../../../../utils/cleanToken';
import { IUser } from '../../../../interface/user/user';
import { ITask } from '../../../../interface/task';
import { TaskCard } from '../../../task-card/TaskCard';

export default function SearchTaskForm() {
  const [user, setUser] = useState<IUser | null>(null);
  const [title, setTitle] = useState<string>('');
  const [favorite, setFavorite] = useState<boolean | null>(null);
  const [status, setStatus] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [tasks, setTasks] = useState<ITask[]>([]);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user) {
      const params: { [key: string]: string } = {};

      if (title) params.title = title;
      if (favorite !== null) params.favorite = favorite ? 'true' : 'false';
      if (status) params.status = status;
      if (sortBy) params.sortBy = sortBy;
      if (sortOrder) params.sortOrder = sortOrder;
      const query = new URLSearchParams(params).toString();
      axiosInstance
        .get(`/task/search/${user.id}?${query}`)
        .then((response) => {
          setTasks(response.data as ITask[]);
        })
        .catch((error) => {
          console.error('Error fetching tasks:', error);
        });
    } else {
      console.error('User data is not available.');
    }
  };

  return (
    <div className={styles.search__component__form}>
      <form className={styles.search__form} onSubmit={handleSubmit}>
        <div className={styles.search__form__input__wrapper}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.search__form__input}
          />
          <button type="submit" className={styles.search__form__button}>
            <FaSearch />
          </button>
        </div>
        <div className={styles.search__form__input__wrapper__other}>
          <label>
            <input
              type="checkbox"
              checked={favorite ?? false}
              onChange={(e) => setFavorite(e.target.checked)}
            />
            Favorite
          </label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value=""> Status</option>
            <option value="created">Criada</option>
            <option value="pending">Pendente</option>
            <option value="in_progress">Em progresso</option>
            <option value="completed">Completada</option>
            <option value="cancelled">Cancelada</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Ordenar por</option>
            <option value="favorite">Favoritas</option>
            <option value="status">Status</option>
          </select>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">Ordenar por</option>
            <option value="ASC">Crescente</option>
            <option value="DESC">Decrescente</option>
          </select>
        </div>
      </form>
      <div className={styles.component__results}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className={styles.item}>
              <TaskCard task={task} />
            </div>
          ))
        ) : (
          <p>Sem tasks para encontrar</p>
        )}
      </div>
    </div>
  );
}
