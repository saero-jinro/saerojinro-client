import { ButtonHTMLAttributes, useState } from 'react';

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  children?: React.ReactNode;
  onClickAction: () => void;
  actionDesc: string;
  delay?: number;
}

/**
 * 기본 디바운싱 0.3s
 * 버튼 기능 라벨링 강제
 */
const ClickButton = ({ children, onClickAction, actionDesc, delay, ...props }: Props) => {
  const DEFAULT_DELAY = 0.3;
  const SEC = (delay ?? DEFAULT_DELAY) * 1000;
  const [disabled, setDisabled] = useState(false);

  const onClickHandler = () => {
    if (disabled) return;
    setDisabled(true);
    onClickAction();
    setTimeout(() => setDisabled(false), SEC);
  };

  return (
    <button
      style={{ cursor: 'pointer' }}
      aria-label={actionDesc}
      onClick={onClickHandler}
      {...props}
    >
      {children}
    </button>
  );
};

export default ClickButton;
