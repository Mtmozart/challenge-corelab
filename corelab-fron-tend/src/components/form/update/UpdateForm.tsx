import styles from './styles.module.scss';
import { Input } from '../Input';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { IUser } from '../../../interface/user/user';
import { UserContext } from '../../../context/UserContext';

interface UpdateFormProps {
  user: IUser;
}

export function UpdateForm({ user }: UpdateFormProps) {
  const [updateUser, setUpdateUser] = useState<IUser>({
    ...user,
  });

  const context = useContext(UserContext);

  useEffect(() => {
    setUpdateUser(user);
  }, [user]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUpdateUser((prevState) => {
      if (name in prevState.address) {
        return {
          ...prevState,
          address: {
            ...prevState.address,
            [name]: value,
          },
        };
      } else {
        return {
          ...prevState,
          [name]: value,
        };
      }
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (context?.update) {
      context.update(updateUser);
    }
  }

  return (
    <section className={styles.main__container}>
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
              value={updateUser.name || ''}
            />
            <Input
              text="E-mail"
              type="email"
              name="email"
              placeholder="Digite o seu e-mail"
              maxLength={50}
              handleOnChange={handleChange}
              value={updateUser.email || ''}
            />
            <Input
              text="Username"
              type="text"
              name="username"
              placeholder="Nome de usuário"
              maxLength={50}
              handleOnChange={handleChange}
              value={updateUser.username || ''}
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
              value={updateUser.address?.cep || ''}
            />
            <Input
              text="Rua"
              type="text"
              name="street"
              placeholder="Rua"
              maxLength={50}
              handleOnChange={handleChange}
              value={updateUser.address?.street || ''}
            />
            <Input
              text="Número"
              type="text"
              name="number"
              placeholder="Número"
              maxLength={10}
              handleOnChange={handleChange}
              value={updateUser.address?.number || ''}
            />
            <Input
              text="Bairro"
              type="text"
              name="neighborhood"
              placeholder="Bairro"
              maxLength={30}
              handleOnChange={handleChange}
              value={updateUser.address?.neighborhood || ''}
            />
            <Input
              text="Cidade"
              type="text"
              name="city"
              placeholder="Cidade"
              maxLength={30}
              handleOnChange={handleChange}
              value={updateUser.address?.city || ''}
            />
            <Input
              text="Estado"
              type="text"
              name="state"
              placeholder="Estado"
              maxLength={20}
              handleOnChange={handleChange}
              value={updateUser.address?.state || ''}
            />
            <Input
              text="País"
              type="text"
              name="country"
              placeholder="País"
              maxLength={20}
              handleOnChange={handleChange}
              value={updateUser.address?.country || ''}
            />
            <Input
              text="Complemento"
              type="text"
              name="complement"
              placeholder="Complemento"
              maxLength={50}
              handleOnChange={handleChange}
              value={updateUser.address?.complement || ''}
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
              value={updateUser.password || ''}
            />
          </div>
          <input className={styles.submit_button} type="submit" value="Atualizar" />
        </form>
      </div>
    </section>
  );
}
