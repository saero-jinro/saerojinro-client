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
          onClickAction={() => ChangeOption(category)}
          className={`${option === category ? 'bg-[#000000] text-white' : 'bg-[#9A9A9A] text-[#49454f]'}`}
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
  onClickAction: () => void;
}

const OptionItem = ({ desc, onClickAction, children, className, ...props }: OptionItemProps) => {
  return (
    <li
      {...props}
      className={`select-none outline-none text-sm h-8 rounded-[8px] flex items-center justify-center whitespace-nowrap ${className}`}
    >
      <ClickButton
        className="w-full h-full py-[6px] px-4"
        actionDesc={desc}
        onClickAction={onClickAction}
      >
        {children}
      </ClickButton>
    </li>
  );
};

export default OptionList;
