import React, {
  useState,
  useRef,
  useEffect,
  ReactNode,
  HTMLAttributes,
  forwardRef,
  useCallback,
} from 'react';
import Card from '@/_components/Card/Card';

interface ScrollWrapperProps {
  children: ReactNode;
  className?: string;
  gap?: number;
}

const ScrollWrapper = ({ children, gap = 10, className }: ScrollWrapperProps) => {
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [maxItemNum, setMaxItemNum] = useState<number>(4);
  const OuterRef = useRef<HTMLDivElement>(null);
  const ItemRef = useRef<HTMLDivElement>(null);
  const getLen = useCallback(() => React.Children.count(children), [children]);

  // 아이템 수에 따른 페이지 수 계산
  useEffect(() => {
    const max = Math.ceil(getLen() / maxItemNum);
    setMaxPage(max);
    setPage((prev) => (prev >= max ? max - 1 : prev));
  }, [maxItemNum, getLen]);

  useEffect(() => {
    setPage(0);
  }, [children]);

  // 리사이즈에 따른 아이템 개수 계산
  useEffect(() => {
    const handleResize = () => {
      if (!ItemRef.current || !OuterRef.current) return;
      const containerWidth = OuterRef.current.clientWidth;
      const itemWidth = ItemRef.current.clientWidth + gap;
      const newMaxItemNum = Math.floor(containerWidth / itemWidth);
      if (newMaxItemNum && newMaxItemNum !== maxItemNum) {
        setMaxItemNum(newMaxItemNum);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [gap, maxItemNum]);

  // 스크롤 시 페이지 계산
  useEffect(() => {
    const outer = OuterRef.current;
    const item = ItemRef.current;
    if (!outer || !item) return;

    const handleScroll = () => {
      const itemWidth = item.clientWidth;
      const totalItems = React.Children.count(children);
      const totalWidth = itemWidth * totalItems;
      const scrollLeft = outer.scrollLeft;
      const containerWidth = outer.clientWidth;
      const maxScrollLeft = totalWidth - containerWidth - itemWidth;

      // 마지막 페이지로 스크롤 됐을 경우 확실히 체크
      const isAtEnd = scrollLeft >= maxScrollLeft - 2;
      if (isAtEnd) {
        setPage(Math.ceil(totalItems / maxItemNum) - 1);
      } else {
        const currentPage = Math.round(scrollLeft / (itemWidth * maxItemNum));
        setPage(currentPage);
      }
    };

    outer.addEventListener('scroll', handleScroll);
    return () => outer.removeEventListener('scroll', handleScroll);
  }, [gap, maxItemNum, children]);

  // 도트 클릭 시 해당 위치로 스크롤 이동
  const scrollToPage = (targetPage: number) => {
    const outer = OuterRef.current;
    const item = ItemRef.current;
    if (!outer || !item) return;
    const itemWidth = item.clientWidth + gap;
    const scrollAmount = itemWidth * targetPage * maxItemNum;
    outer.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    setPage(targetPage);
  };

  return (
    <div className="relative">
      {/* 카드 크기 측정용 */}
      <HiddenCard ref={ItemRef} />

      {/* 스크롤 영역 */}
      <div
        ref={OuterRef}
        aria-live="polite"
        className={`overflow-x-scroll hide-scrollbar scroll-smooth ${className}`}
      >
        <ul className="flex gap-2.5">
          {React.Children.toArray(children).map((child, idx) => (
            <li key={idx}>{child}</li>
          ))}
        </ul>
      </div>

      {/* 페이지 점 */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: maxPage }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToPage(i)}
            aria-label={`페이지 ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-colors outline-none ${
              i === page ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollWrapper;

// 카드 사이즈 측정용
const HiddenCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
  return (
    <div ref={ref} aria-hidden={true} className="invisible fixed z-[-5]" {...props}>
      <Card
        id={0}
        image="/public/main/map"
        title=""
        time=""
        category=""
        speakerName=""
        isWished={true}
        isProfile={false}
      />
    </div>
  );
});
HiddenCard.displayName = 'HiddenCard';
