import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import bus from '../../utils/bus';

export default function Message() {
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    bus.addListener('message', ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);
      setTimeout(() => {
        setVisibility(false);
      }, 3000);
    });
  }, []);
  if (!visibility) {
    return null;
  }
  return (
    visibility && (
      <div className={styles.container}>
        <div className={`${styles.message} ${styles[type]}`}>{message}</div>
      </div>
    )
  );
}
