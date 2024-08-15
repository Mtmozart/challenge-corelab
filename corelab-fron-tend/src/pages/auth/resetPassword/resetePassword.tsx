import { ResetPasswordForm } from '../../../components/form/reset/ResetForm';
import styles from './index.module.scss';
export default function ResetPasswordScreen() {
  return (
    <section className={styles.main__container}>
      <div className={styles.main__container__content}>
        <ResetPasswordForm />
      </div>
    </section>
  );
}
