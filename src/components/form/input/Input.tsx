import { inputProps } from './types';
import './input.css';

export const Input = (props: inputProps) => {
  const { label, placeholder, value, onChange } = props;

  return (
    <div className="input-container">
      <label>{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
