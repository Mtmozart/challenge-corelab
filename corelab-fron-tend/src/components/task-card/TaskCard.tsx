import { Link } from 'react-router-dom';
import { ITask } from '../../interface/task';
import formatDate from '../../utils/formaterData';
import styles from './task.module.scss';
import { AiFillEdit } from 'react-icons/ai';
import FavoriteButton from '../form/task/buttonsForm/AddFavorite';
import RemoveTaskButton from '../form/task/buttonsForm/RemoveTask';

interface ICardTaskProps {
  task: ITask;
}

export function TaskCard({ task }: ICardTaskProps) {
  const limitDateFormatted = formatDate(task.limitDate);

  return (
    <section className={styles.container__task} key={task.id}>
      <div className={styles.card_task}>
        <div className={styles.task__content__top}>
          <h3 className={styles.title}>
            <strong>Título: </strong> <br />
            {task.title}
          </h3>
          <div className={styles.header}>
            <Link to={`/edit-task/${task.id}`}>
              <AiFillEdit size={27} color="blue" />
            </Link>
            <RemoveTaskButton id={task.id} />
            <FavoriteButton id={task.id} initialFavoriteStatus={task.favorite} />
          </div>
        </div>
        <p className={styles.description}>
          <strong>Descrição:</strong> <br />
          {task.description}
        </p>
        <p className={styles.limitDate}>
          <strong>Data: </strong> {limitDateFormatted}
        </p>
        <p className={styles.status}>
          <strong>Status: </strong>
          {task.status === 'created'
            ? 'Criado'
            : task.status === 'pending'
              ? 'Pendente'
              : task.status === 'in_progress'
                ? 'Em Progresso'
                : task.status === 'completed'
                  ? 'Concluído'
                  : task.status === 'cancelled'
                    ? 'Cancelado'
                    : 'Desconhecido'}
        </p>
      </div>
    </section>
  );
}
