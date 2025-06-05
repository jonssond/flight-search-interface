import { dateInputProps } from './types';

export const DateInput = (props: dateInputProps) => {
  const { label, value, onChange } = props;

  return (
    <div>
      <p>{label}</p>
      <input type="date" value={value} onChange={onChange} />
    </div>
  );
};
