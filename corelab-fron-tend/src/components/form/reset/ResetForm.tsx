import styles from './styles.module.scss';
import { Input } from '../Input';
import { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../../config/api';
import useMessage from '../../../hooks/useMessage';

export function ResetPasswordForm() {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { setMessage } = useMessage();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    let msgText = 'E-mail enviando!';
    let msgType = 'success';
    try {
      await axiosInstance.put('/auth/reset-password', { email });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        msgText = error.response?.data?.message || 'Unknown error';
        msgType = 'error';
      } else {
        msgText = error.response?.data?.message;
        msgType = 'error';
      }
    } finally {
      setLoading(false);
      setMessage(msgText, msgType);
    }
  }

  return (
    <section className={styles.main__container}>
      <h1>Redefinir Senha</h1>
      <div className={styles.main__container__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <Input
              text="Email"
              type="email"
              name="email"
              placeholder="Email"
              maxLength={100}
              handleOnChange={handleChange}
              value={email}
            />
          </div>
          <input
            className={styles.submit_button}
            type="submit"
            value={loading ? 'Enviando...' : 'Resetar'}
            disabled={loading}
          />
        </form>
      </div>
    </section>
  );
}
