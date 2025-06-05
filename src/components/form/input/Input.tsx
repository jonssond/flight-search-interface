import { inputProps } from './types';

export const Input = (props: inputProps) => {
  const { label, placeholder, value, onChange } = props;

  return (
    <div>
      <p>{label}</p>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
