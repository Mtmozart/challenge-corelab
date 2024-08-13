import { ButtonHTMLAttributes } from 'react';
import styles from './button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  loading?: boolean;
  prefix?: any;
  suffix?: any;
}

export function Button({ loading, text, prefix, suffix, ...props }: IButtonProps) {
  return (
    <button {...props} className={styles.button__component}>
      {loading && <span className=""></span>}
      {prefix && prefix}
      {text}
      {suffix && suffix}
    </button>
  );
}
