import { buttonProps } from './types';

export const Button = (props: buttonProps) => {
  return (
    <div>
      <button>{props.content}</button>
    </div>
  );
};
