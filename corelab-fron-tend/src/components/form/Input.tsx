import styles from './styles.module.scss';
type InputProps = {
  type: string;
  text: string;
  name: string;
  placeholder: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  value?: string | number;
  multiple?: boolean;
};

export function Input({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  maxLength,
  value,
  multiple,
}: InputProps) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        maxLength={maxLength}
        value={value}
        {...(multiple ? { multiple } : '')}
      />
    </div>
  );
}
