import styles from './styles.module.scss';
import { Input } from '../Input';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { IUserCreate } from '../../../interface/user/user';
import { UserContext } from '../../../context/UserContext';

export function RegistrationForm() {
  const [user, setUser] = useState<IUserCreate>({
    name: '',
    email: '',
    username: '',
    password: '',
    address: {
      cep: '',
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      country: '',
      complement: '',
    },
  });
  const context = useContext(UserContext);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (context?.register) {
      console.log(user)
      context.register(user);
    } else {
      console.error('register function is not available in UserContext.');
    }
  }

  return (
    <section className={styles.main__container}>
      <h1>Registre-se</h1>
      <div className={styles.main__container__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.form_group}>
            <Input
              text="Nome"
              type="text"
              name="name"
              placeholder="Nome completo"
              maxLength={50}
              handleOnChange={handleChange}
            />
            <Input
              text="E-mail"
              type="email"
              name="email"
              placeholder="Digite o seu e-mail"
              maxLength={50}
              handleOnChange={handleChange}
            />
            <Input
              text="Username"
              type="text"
              name="username"
              placeholder="Nome de usuário"
              maxLength={50}
              handleOnChange={handleChange}
            />
          </div>

          <div className={styles.address_group}>
            <Input
              text="Cep"
              type="text"
              name="cep"
              placeholder="cep"
              maxLength={10}
              handleOnChange={handleChange}
            />
            <Input
              text="Rua"
              type="text"
              name="street"
              placeholder="Rua"
              maxLength={50}
              handleOnChange={handleChange}
            />
            <Input
              text="Número"
              type="text"
              name="number"
              placeholder="Número"
              maxLength={10}
              handleOnChange={handleChange}
            />
            <Input
              text="Bairro"
              type="text"
              name="neighborhood"
              placeholder="Bairro"
              maxLength={30}
              handleOnChange={handleChange}
            />
            <Input
              text="Cidade"
              type="text"
              name="city"
              placeholder="Cidade"
              maxLength={30}
              handleOnChange={handleChange}
            />
            <Input
              text="Estado"
              type="text"
              name="state"
              placeholder="Estado"
              maxLength={20}
              handleOnChange={handleChange}
            />
            <Input
              text="País"
              type="text"
              name="country"
              placeholder="País"
              maxLength={20}
              handleOnChange={handleChange}
            />
            <Input
              text="Complemento"
              type="text"
              name="complement"
              placeholder="Complemento"
              maxLength={50}
              handleOnChange={handleChange}
            />
          </div>

          <div className={styles.password_group}>
            <Input
              text="Senha"
              type="password"
              name="password"
              placeholder="Digite a sua senha"
              maxLength={15}
              handleOnChange={handleChange}
            />
          </div>
          <input type="submit" value="Cadastrar" />
        </form>
      </div>
    </section>
  );
}
