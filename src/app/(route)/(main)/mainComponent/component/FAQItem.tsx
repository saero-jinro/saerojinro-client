'use client';
import { useRef, useState, useEffect } from 'react';
import { FAQItemType } from '../FourthSection';
import DownSvg from '@/assets/Main/down.svg';
import UpSvg from '@/assets/Main/up.svg';

const FAQItem = ({ title, contents }: FAQItemType) => {
  const [toggle, setToggle] = useState(false);
  const [showText, setShowText] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const clickHandler = () => {
    if (!toggle) {
      setShowText(false);
    }
    setToggle((prev) => !prev);
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    if (toggle) {
      const scrollHeight = el.scrollHeight;
      setHeight(scrollHeight);
    } else {
      setHeight(0);
    }
  }, [toggle]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const handleTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName === 'height' && toggle) {
        setShowText(true);
      }
    };

    el.addEventListener('transitionend', handleTransitionEnd);
    return () => {
      el.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [toggle]);

  return (
    <div className="border-b border-[#E2E8F0] dark:border-[#161F2E] ">
      <button
        aria-expanded={toggle}
        onClick={clickHandler}
        aria-label="toggle-FAQ"
        className="bg-[#F8FAFC] text-black dark:bg-[#02050C] dark:text-[#fff] w-full flex flex-row items-start p-4 md:p-6 select-none cursor-pointer"
      >
        <div className="font-semibold text-base md:text-xl w-full text-start">
          <span className="mr-2">Q.</span>
          <span>{title}</span>
        </div>
        {toggle ? <UpSvg /> : <DownSvg />}
      </button>

      <div
        ref={contentRef}
        style={{
          height,
          overflow: 'hidden',
          transition: 'height 0.15s ease',
        }}
        aria-hidden={!toggle}
        className="bg-[#E2E8F0] text-[#424242] dark:bg-[#070A12] dark:text-[#CAD5E2]"
      >
        <div
          className={`block transition-opacity p-4 pt-3 md:p-6 md:pt-5 text-sm md:text-lg font-medium duration-100 ${
            showText ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="mr-2">A.</span>
          <span>{contents}</span>
        </div>
      </div>
    </div>
  );
};

export default FAQItem;
