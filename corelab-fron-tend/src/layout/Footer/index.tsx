import styles from './styles.module.css';
export function Footer() {
  return (
    <footer className={styles.footer__container}>
      <p>
        &copy; 2024 Corelab. Todos os direitos reservados. Desenvolvido por
        <a
          href="https://www.linkedin.com/in/matheus-mozart-borges"
          target="_blank"
          rel="noopener noreferrer"
        >
          {' '}
          Matheus Mozart
        </a>
        .
      </p>
    </footer>
  );
}
