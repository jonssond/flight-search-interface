import { dateInputProps } from './types';
import './date-input.css';

export const DateInput = (props: dateInputProps) => {
  const { label, value, onChange } = props;

  return (
    <div className="date-input-container">
      <label>{label}</label>
      <input type="date" value={value} onChange={onChange} />
    </div>
  );
};
