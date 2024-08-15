import styles from './text-area.module.scss';

type TextAreaProps = {
  text: string;
  name: string;
  placeholder: string;
  handleOnChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  value?: string | number;
};

export default function TextArea({
  text,
  name,
  placeholder,
  handleOnChange,
  maxLength,
  value,
}: TextAreaProps) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        maxLength={maxLength}
        value={value}
      />
    </div>
  );
}
