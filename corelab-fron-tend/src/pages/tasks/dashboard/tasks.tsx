import { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import { FaPlus } from 'react-icons/fa';
import SearchTaskForm from '../../../components/form/task/search/SearchTaskForm';
import { UserContext } from '../../../context/UserContext';

export default function TasksScreen() {
  const context = useContext(UserContext);
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
        <h1>Dashboard</h1>
        <div className={styles.main__container__task__to__create}>
          <Link to={'/create-task'}>
            {' '}
            Adicionar task <FaPlus size={18} />{' '}
          </Link>
        </div>
        <div className={styles.container__task__your__task}>
          <h2>Pesquise suas tasks:</h2>
          <SearchTaskForm />
        </div>
      </section>
    </section>
  );
}
