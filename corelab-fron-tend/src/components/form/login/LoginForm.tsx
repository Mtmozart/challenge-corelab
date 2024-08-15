import styles from './styles.module.scss';
import { Input } from '../Input';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { ILogin } from '../../../interface/user/user';
import { UserContext } from '../../../context/UserContext';

export function LoginForm() {
  const [user, setUser] = useState<ILogin>({
    username: '',
    password: '',
  });
  const userContext = useContext(UserContext);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (userContext && userContext.login) {
      userContext.login(user);
    } else {
      console.error('Login function is not available');
    }
  }

  return (
    <section className={styles.main__container}>
      <h1>Login</h1>
      <div className={styles.main__container__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <Input
              text="Username"
              type="text"
              name="username"
              placeholder="Username"
              maxLength={500}
              handleOnChange={handleChange}
            />
            <Input
              text="Senha"
              type="password"
              name="password"
              placeholder="Digite sua senha"
              maxLength={50}
              handleOnChange={handleChange}
            />
          </div>
          <input className={styles.submit_button} type="submit" value="Login" />
        </form>
      </div>
    </section>
  );
}
