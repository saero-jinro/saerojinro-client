import ClickButton from '@/_components/ClickButton';
import { HTMLAttributes, ReactNode } from 'react';

interface Props {
  option: number;
  startDay: number;
  ChangeOption: (option: number) => void;
  className?: string;
  limit?: number;
}

const OptionList = ({ option, limit = 3, ChangeOption, className, startDay }: Props) => {
  const options = [...Array(limit).keys()].map((idx) => startDay + idx);
  const getScript = (opt: number) => `${opt}일`;

  return (
    <ul className={`flex gap-[0.5rem] select-none ${className}`}>
      {options.map((opt) => (
        <OptionItem
          key={opt}
          desc={`item-change-${opt}`}
          onClickAction={() => ChangeOption(opt)}
          className={`${option === opt ? 'bg-[#000000] text-white' : 'bg-[#9A9A9A] text-[#49454f]'}`}
        >
          {getScript(opt)}
        </OptionItem>
      ))}
    </ul>
  );
};

interface OptionItemProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  desc: string;
  onClickAction: () => void;
}

const OptionItem = ({ desc, onClickAction, children, className, ...props }: OptionItemProps) => {
  return (
    <li
      {...props}
      className={`select-none outline-none text-sm h-8 py-[6px] px-4 rounded-[8px] flex items-center justify-center whitespace-nowrap ${className}`}
    >
      <ClickButton actionDesc={desc} onClickAction={onClickAction}>
        {children}
      </ClickButton>
    </li>
  );
};

export default OptionList;
