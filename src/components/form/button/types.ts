export type buttonProps = {
  content: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
};
