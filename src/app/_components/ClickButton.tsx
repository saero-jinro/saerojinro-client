import { ButtonHTMLAttributes, useState } from 'react';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children?: React.ReactNode;
  onClick: () => void;
  actionDesc: string;
  delay?: number;
}

/**
 * 기본 디바운싱 0.3s
 * 버튼 기능 라벨링 강제
 */
const ClickButton = ({ children, onClick, actionDesc, delay, className, ...props }: Props) => {
  const DEFAULT_DELAY = 0.3;
  const SEC = (delay ?? DEFAULT_DELAY) * 1000;
  const [disabled, setDisabled] = useState(false);

  const onClickHandler = () => {
    if (disabled) return;
    setDisabled(true);
    onClick();
    setTimeout(() => setDisabled(false), SEC);
  };

  return (
    <button
      style={{ cursor: 'pointer' }}
      aria-label={actionDesc}
      onClick={onClickHandler}
      className={`hover:brightness-90 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ClickButton;
