import styles from './index.module.scss';

export default function HomeScreen() {
  return (
    <section className={styles.main__container}>
      <section className={styles.main__container__content}>
        <h1>Gerencie suas atividades diárias</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi commodi iste nemo nulla?
          Amet quo quibusdam, dolore sit illo obcaecati ratione quam asperiores quis consequatur
          aspernatur id distinctio blanditiis. Quasi!
        </p>
        <a href="">Acessar</a>
      </section>
    </section>
  );
}
