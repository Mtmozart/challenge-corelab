import styles from './select.module.scss';
type Option = {
  value: string;
  label: string;
};

interface SelectProps {
  text: string;
  name: string;
  options: Option[];
  handleOnChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}

function Select({ text, name, options, handleOnChange, value }: SelectProps) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}:</label>
      <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
        <option value="">Selecione uma categoria</option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
