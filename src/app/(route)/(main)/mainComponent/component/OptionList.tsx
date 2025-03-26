import ClickButton from '@/_components/ClickButton';
import { HTMLAttributes, ReactNode } from 'react';
import { CategoryLabel, CategoryWithAll } from './SectionList';

interface Props {
  option: CategoryWithAll;
  ChangeOption: (option: CategoryWithAll) => void;
  className?: string;
  limit?: number;
}

export const OptionList = ({ option, ChangeOption, className }: Props) => {
  const options = Object.entries(CategoryLabel) as [CategoryWithAll, string][];

  return (
    <ul className={`flex gap-[0.5rem] select-none flex-wrap ${className}`}>
      {options.map(([category, title]) => (
        <OptionItem
          key={category}
          desc={`item-change-${category}`}
          onClick={() => ChangeOption(category)}
          className={`${option === category ? 'bg-[#000000] dark:bg-[#fff] text-white dark:text-black' : 'bg-[#9A9A9A] dark:bg-[#000] text-[#49454f] dark:text-[#fff] shadow-[0_0_0_1px_#ffffff30]'}`}
        >
          {title}
        </OptionItem>
      ))}
    </ul>
  );
};

interface OptionItemProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  desc: string;
  onClick: () => void;
}

const OptionItem = ({ desc, onClick, children, className, ...props }: OptionItemProps) => {
  return (
    <li
      {...props}
      className={`select-none outline-none text-sm h-8 rounded-full flex items-center justify-center whitespace-nowrap ${className}`}
    >
      <ClickButton className="w-full h-full py-[6px] px-4" actionDesc={desc} onClick={onClick}>
        {children}
      </ClickButton>
    </li>
  );
};

export default OptionList;
