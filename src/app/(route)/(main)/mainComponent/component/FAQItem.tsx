'use client';
import { useRef, useState, useEffect } from 'react';
import DownSvg from '@/assets/Main/down.svg';
import UpSvg from '@/assets/Main/up.svg';
import { FAQItemType } from '../FourthSection';

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
    <div className="border-b border-[#E2E8F0] text-black">
      <button
        aria-expanded={toggle}
        onClick={clickHandler}
        aria-label="toggle-FAQ"
        className="bg-[#F8FAFC] w-full flex flex-row items-start p-6 select-none"
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
        className="bg-[#E2E8F0]"
      >
        <div
          className={`block transition-opacity p-6 pt-5 text-sm md: text-lg font-medium duration-100 ${
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
