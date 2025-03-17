import React, { useState, useRef, useEffect, ReactNode } from 'react';
import useHeaderStore from '@/_store/Header/useHeaderStore';
import ClickButton from '@/_components/ClickButton';

interface ScrollWrapperProps {
  scrollStep?: number;
  children: ReactNode;
  gap?: number;
  className?: string;
}

const ScrollWrapper = ({ children, gap = 10, scrollStep = 3, className }: ScrollWrapperProps) => {
  const viewmode = useHeaderStore((store) => store.state.mode);
  const [innerWidth, setInnerWidth] = useState(0);
  const [outerWidth, setOuterWidth] = useState(0);
  const [scroll, setScroll] = useState(0);

  const InnerRef = useRef<HTMLUListElement>(null);
  const OuterRef = useRef<HTMLDivElement>(null);
  const ItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!OuterRef.current) return;
    setOuterWidth(OuterRef.current.clientWidth);
  }, []);

  useEffect(() => {
    const Item = ItemRef.current;
    const Inner = InnerRef.current;
    if (!Item || !Inner) return;

    setInnerWidth((Item.clientWidth + gap) * React.Children.count(children) - gap);
  }, [children, gap]);

  const scrollByCards = (direction: 1 | -1) => {
    if (!OuterRef.current || !ItemRef.current) return;
    const itemWidth = ItemRef.current.clientWidth + gap;
    const scrollAmount = itemWidth * scrollStep * direction;

    OuterRef.current.scrollTo({
      left: OuterRef.current.scrollLeft + scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (!OuterRef.current) return;

    OuterRef.current.scrollTo({
      left: 0,
      behavior: 'smooth',
    });
    setScroll(0);
  }, [children, OuterRef, setScroll]);

  return (
    <div className="relative">
      {viewmode === 'web' && scroll > 0 && (
        <ClickButton
          actionDesc="left-scroll"
          onClickAction={() => scrollByCards(-1)}
          className="absolute w-[40px] h-[40px] flex items-center justify-center left-0 top-1/2 z-50 -translate-y-1/2 -translate-x-[calc(100%_+_10px)] bg-white p-3 border rounded-full shadow"
        >
          ◀
        </ClickButton>
      )}

      {viewmode === 'web' && scroll + outerWidth < innerWidth && (
        <ClickButton
          actionDesc="right-scroll"
          onClickAction={() => scrollByCards(1)}
          className="absolute w-[40px] h-[40px] flex items-center justify-center right-0 top-1/2 z-50 -translate-y-1/2 translate-x-[calc(100%_+_10px)] bg-white p-3 border rounded-full shadow"
        >
          ▶
        </ClickButton>
      )}

      <div
        ref={OuterRef}
        aria-live="polite"
        onScroll={(e) => setScroll(e.currentTarget.scrollLeft)}
        className={`overflow-x-scroll hide-scrollbar ${className}`}
      >
        <ul ref={InnerRef} className="flex gap-2.5">
          {React.Children.toArray(children).map((child, idx) => (
            <li key={idx} ref={idx === 0 ? ItemRef : undefined}>
              {child}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ScrollWrapper;
