import { useContext, useState } from 'react';
import styles from './styles.module.scss';
import { FaAlignJustify } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const { authenticated = false, logout = () => {} } = useContext(UserContext) || {};

  const toggleIcon = () => {
    setIsVisible(!isVisible);
  };

  return (
    <header className={styles.header__container}>
      <nav className={styles.nav__container}>
        <section className={styles.nav__container__logo}>
          <a href="/tasks">Tasks</a>
        </section>
        <section className={styles.nav__container__toggle} onClick={toggleIcon}>
          {isVisible ? <FaTimes /> : <FaAlignJustify />}
        </section>

        <ul className={`${styles.nav__container__list} ${isVisible ? styles.show : ''}`}>
          <li>
            <Link to={'/'}>home</Link>
          </li>
          {authenticated ? (
            <>
              <li>
                <Link onClick={logout} to={''}>
                  logout
                </Link>
              </li>
              <li>
                <Link to={'/profile'}>perfil</Link>
              </li>
              <li>
                <Link to="/tasks">tasks</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
