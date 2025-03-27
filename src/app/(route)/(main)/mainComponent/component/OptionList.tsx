import ClickButton from '@/_components/ClickButton';
import { HTMLAttributes, ReactNode } from 'react';
import { CategoryLabel, CategoryWithAll } from './SectionList';

interface Props {
  option: CategoryWithAll;
  ChangeOption: (option: CategoryWithAll) => void;
  optionList: CategoryWithAll[];
  className?: string;
  limit?: number;
}

export const OptionList = ({ option, ChangeOption, className, optionList }: Props) => {
  return (
    <div className="w-full overflow-x-auto hide-scrollbar">
      <ul className={`flex gap-[0.5rem] select-none ${className}`}>
        {optionList.map((item) => (
          <OptionItem
            key={item}
            desc={`item-change-${item}`}
            onClick={() => ChangeOption(item)}
            className={`${option === item ? 'bg-[#000] text-[#fff] dark:bg-[#fff] dark:text-black' : 'bg-[#E2E8F0] text-[#212121] dark:bg-[#070A12] dark:text-[#fff]'}`}
          >
            {CategoryLabel[item]}
          </OptionItem>
        ))}
      </ul>
    </div>
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
      className={`select-none outline-none text-sm md:text-base font-semibold rounded-[20px] flex items-center justify-center whitespace-nowrap ${className}`}
    >
      <ClickButton className="w-full h-full py-2 px-3 md:px-4" actionDesc={desc} onClick={onClick}>
        {children}
      </ClickButton>
    </li>
  );
};

export default OptionList;
