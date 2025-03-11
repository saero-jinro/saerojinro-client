import { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}
const SectionWrapper = ({ children, className, ...props }: Props) => {
  return (
    <section {...props} className={`${className} 'w-full h-auto px-[50px] py-[60px] mx-auto`}>
      {children}
    </section>
  );
};
export default SectionWrapper;
