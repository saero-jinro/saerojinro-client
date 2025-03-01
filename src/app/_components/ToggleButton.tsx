import { ButtonHTMLAttributes } from 'react';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children: React.ReactNode;
  onToggle: () => void;
  actionDesc: string;
}

const ToggleButton = ({ children, onToggle, actionDesc, ...props }: Props) => {
  return (
    <button style={{ cursor: 'pointer' }} aria-label={actionDesc} onClick={onToggle} {...props}>
      {children}
    </button>
  );
};

export default ToggleButton;
