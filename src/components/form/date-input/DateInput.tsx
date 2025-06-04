import { dateInputProps } from './types';

export const DateInput = (props: dateInputProps) => {
  return (
    <div>
      <p>{props.label}</p>
      <input type="date" name="" id="" />
    </div>
  );
};
