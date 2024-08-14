import { RegistrationForm } from '../../../components/form/register/RegisterForm';
import styles from './index.module.scss';

export function RegisterScreen() {
  return (
    <section className={styles.main__container}>
      <div className={styles.main__container__content}>
        <RegistrationForm />
      </div>
    </section>
  );
}
