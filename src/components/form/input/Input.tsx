import { inputProps } from './types';

export const Input = (props: inputProps) => {
  const { label, placeholder } = props;
  return (
    <div>
      <p>{label}</p>
      <input type="text" name="" id="" placeholder={placeholder} />
    </div>
  );
};
