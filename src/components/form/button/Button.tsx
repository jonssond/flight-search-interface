import { buttonProps } from './types';

export const Button = (props: buttonProps) => {
  const { content, type, onClick } = props;

  return (
    <div>
      <button type={type} onClick={onClick}>
        {content}
      </button>
    </div>
  );
};
