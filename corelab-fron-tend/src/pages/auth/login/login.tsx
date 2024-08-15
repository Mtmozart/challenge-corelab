import { Link } from 'react-router-dom';
import { LoginForm } from '../../../components/form/login/LoginForm';
import styles from './index.module.scss';
export default function LoginScreen() {
  return (
    <section className={styles.main__container}>
      <div className={styles.main__container__content}>
        <LoginForm />
        <span>
          Não tem conta ? <Link to={'/register'}>Registre-se</Link>
        </span>
        <span>
          <Link to={'/reset-password'}>Esqueceu a sua senha ?</Link>
        </span>
      </div>
    </section>
  );
}
