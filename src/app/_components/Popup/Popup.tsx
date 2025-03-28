'use client';
import useHeaderStore from '@/_store/Header/useHeaderStore';
import { HTMLAttributes } from 'react';
import ClickButton from '../ClickButton';
import ToggleModal from '../ToggleModal';

const Popup = () => {
  const { func, contents, isOpen, mode } = useHeaderStore((store) => store.popup.state);
  const closePopup = useHeaderStore((store) => store.popup.actions.closePopup);

  return (
    <ToggleModal hasOverlay desc="confirm-popup" isOpen={isOpen} onClose={closePopup}>
      <PopupComponent contents={contents} onClick={func} onClose={closePopup} mode={mode} />
    </ToggleModal>
  );
};

export default Popup;

interface Props extends HTMLAttributes<HTMLDivElement> {
  mode?: 'choice' | 'check';
  contents: string;
  onClose: () => void;
  onClick?: () => void;
}

// 혹시 몰라서 독립적이게 구현
export const PopupComponent = ({
  contents,
  onClose,
  onClick,
  mode = 'choice',
  ...props
}: Props) => {
  const onCloseHandler = async () => {
    if (!onClick) return;
    onClick();
    onClose();
  };

  return (
    <div
      {...props}
      className="w-[90%] xs:w-[285px] md:w-[388px] h-[177px] md:h-[202px] fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-[1000] bg-white dark:bg-[#0F172B] flex flex-col justify-between items-center rounded-[4px] overflow-hidden"
    >
      <div className="flex w-full items-center justify-center flex-[1_0_0] p-4">
        <span className="text-[#212121] dark:text-[#fff] text-sm whitespace-pre-line md:text-lg">
          {contents}
        </span>
      </div>
      <div className="self-stretch flex items-center h-12 w-full">
        {mode === 'choice' ? (
          <>
            <ClickButton
              actionDesc="cancle"
              onClick={onClose}
              className="bg-[#9E9E9E] dark:bg-[#616161] h-full text-white flex-[1_0_0]"
            >
              취소
            </ClickButton>
            <ClickButton
              actionDesc="cancle"
              onClick={onCloseHandler}
              className="btn flex-[1_0_0] h-full "
            >
              동의
            </ClickButton>
          </>
        ) : (
          <button onClick={onClose} className="btn flex-[1_0_0] h-full">
            확인
          </button>
        )}
      </div>
    </div>
  );
};
