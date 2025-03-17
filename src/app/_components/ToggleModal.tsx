import React, { HTMLAttributes, useEffect, useRef } from 'react';

export interface ToggleModalProps extends HTMLAttributes<HTMLDivElement> {
  desc: string; // 라벨링
  isOpen: boolean; // 상태
  hasOverlay?: boolean; // 오버레이 유무
  children: React.ReactNode; // 자식 노드
  onClose: () => void; // 모달 off 함수
}

// 모달 내부를 제외한 어디를 클릭을 하던 모달은 닫힘
const ToggleModal = ({
  desc,
  isOpen,
  children,
  hasOverlay = false,
  onClose,
  ...props
}: ToggleModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const modal = ref.current;
    if (!modal) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // 이벤트가 할당되는 동시에 꺼지는 문제로 딜레이 걸음
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 0);

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {hasOverlay && <Overlay />}
      <div
        id={`modal-${desc}`}
        role="dialog"
        ref={ref}
        aria-labelledby={desc}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose();
        }}
        {...props}
      >
        {children}
      </div>
    </>
  );
};

const Overlay = () => {
  const TOP_GAP = 78.32;
  return (
    <div
      style={{ height: `calc(100vh - ${TOP_GAP}px )` }}
      className="fixed z-100 w-screen bottom-0 bg-[#8181815e] left-0"
    />
  );
};

export default ToggleModal;
