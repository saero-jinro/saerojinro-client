import ClickButton from '@/_components/ClickButton';
import { HTMLAttributes, ReactNode } from 'react';
import { LectureOption } from '../SecSection';

interface Props {
  option: LectureOption;
  ChangeOption: (option: LectureOption) => void;
}

const OptionList = ({ option, ChangeOption }: Props) => {
  const options: LectureOption[] = ['all', 12, 13, 14];
  const getScript = (opt: LectureOption) => (opt === 'all' ? '전체' : `${opt}일`);
  return (
    <ul className="flex gap-[0.5rem] text-gray-950 font-bold select-none">
      {options.map((opt) => (
        <OptionItem
          key={opt}
          desc={`item-change-${opt}`}
          onClickAction={() => ChangeOption(opt)}
          className={`${option === opt ? 'bg-[#000000] text-white' : 'bg-[#dadada] text-black'}`}
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
      className={`text-lg py-1 px-4 rounded-full flex items-center justify-center whitespace-nowrap ${className}`}
    >
      <ClickButton actionDesc={desc} onClickAction={onClickAction}>
        {children}
      </ClickButton>
    </li>
  );
};

export default OptionList;
