import { buttonProps } from './types';
import './button.css';

export const Button = (props: buttonProps) => {
  const { content, type, onClick, variant = 'primary' } = props;

  return (
    <button type={type} onClick={onClick} className={`button ${variant}`}>
      {content}
    </button>
  );
};
