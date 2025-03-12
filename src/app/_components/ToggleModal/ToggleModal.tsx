import React, { HTMLAttributes, useEffect, useRef } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  desc: string; // 라벨링
  isOpen: boolean; // 상태
  children: React.ReactNode; // 자식 노드
  onClose: () => void; // 모달 off 함수
}

// 모달 내부를 제외한 어디를 클릭을 하던 모달은 닫힘
const ToggleModal = ({ desc, isOpen, children, onClose, ...props }: Props) => {
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
    <div
      id={`modal-${desc}`}
      role="dialog"
      ref={ref}
      aria-labelledby={desc}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {children}
    </div>
  );
};

export default ToggleModal;
