import { useState } from 'react';
import styles from './styles.module.scss';
import { FaAlignJustify } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
export function Header() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleIcon = () => {
    setIsVisible(!isVisible);
  };

  return (
    <header className={styles.header__container}>
      <nav className={styles.nav__container}>
        <section className={styles.nav__container__logo}>
          <a href="/">TASKS</a>
        </section>
        <section className={styles.nav__container__toggle} onClick={toggleIcon}>
          {isVisible ? <FaTimes /> : <FaAlignJustify />}
        </section>

        <ul className={`${styles.nav__container__list} ${isVisible ? styles.show : ''}`}>
          <li>
            <a href="">home</a>
          </li>
          <li>
            <a href="">login/logout</a>
          </li>
          <li>
            <a href="">tasks</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
