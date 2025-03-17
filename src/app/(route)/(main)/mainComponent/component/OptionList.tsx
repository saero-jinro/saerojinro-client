import ClickButton from '@/_components/ClickButton';
import { HTMLAttributes, ReactNode } from 'react';
import { LectureOption } from '../SecSection';

interface Props {
  option: LectureOption;
  ChangeOption: (option: LectureOption) => void;
  className?: string;
}

const OptionList = ({ option, ChangeOption, className }: Props) => {
  const options: LectureOption[] = ['all', 12, 13, 14];
  const getScript = (opt: LectureOption) => (opt === 'all' ? '전체' : `${opt}일`);
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
      className={`text-sm h-8 py-[6px] px-4 rounded-[8px] flex items-center justify-center whitespace-nowrap ${className}`}
    >
      <ClickButton actionDesc={desc} onClickAction={onClickAction}>
        {children}
      </ClickButton>
    </li>
  );
};

export default OptionList;
