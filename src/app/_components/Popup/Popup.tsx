'use client';

import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  contents: string;
  onClose: () => void;
  onClick?: () => void;
}

export const PopupComponent = ({ contents, onClose, onClick, ...props }: Props) => {
  return (
    <div
      {...props}
      className="w-[90%] xs:w-[285px] md:w-[388px] h-[177px] md:h-[202px] fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-[1000] bg-white flex flex-col justify-between items-center rounded-[4px] overflow-hidden"
    >
      <div className="flex w-full items-center justify-center flex-[1_0_0] p-4">
        <span className="text-[##212121] text-sm md:text-lg">{contents}</span>
      </div>
      <div className="self-stretch flex items-center h-12 w-full">
        {onClick && (
          <>
            <button onClick={onClose} className="bg-[#9E9E9E] h-full text-white flex-[1_0_0]">
              취소
            </button>
            <button
              onClick={() => {
                onClick();
                onClose();
              }}
              className="btn flex-[1_0_0] h-full"
            >
              동의
            </button>
          </>
        )}

        {!onClick && (
          <button onClick={onClose} className="btn flex-[1_0_0] h-full">
            확인
          </button>
        )}
      </div>
    </div>
  );
};
