'use client';

import DownSvg from '@/assets/Main/down.svg';
import UpSvg from '@/assets/Main/up.svg';
import { useRef, useState } from 'react';

// 추후 서버 사이드로 넘기는 부분
const FourthSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <>
      <section ref={ref} aria-labelledby="FAQ" className="bg-[#343A40]">
        <div className="px-[40px] py-[120px] max-w-[1280px] flex flex-col mx-auto">
          <h2
            id="FAQ"
            className="text-[32px] mb-6 flex items-center justify-center font-bold text-white"
          >
            FAQ
          </h2>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
      </section>
    </>
  );
};
export default FourthSection;

// 컴포넌트 분리 필요함
const Item = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const clickHandler = () => setToggle((prev) => !prev);
  return (
    <div>
      <button
        aria-expanded={toggle}
        onClick={clickHandler}
        aria-label="toggle-FAQ"
        className="bg-white w-full flex flex-row items-start px-4 py-3 select-none"
      >
        <span className="font-bold text-lg w-full text-start">Q. .....하는 게 어떤가요?</span>
        {toggle ? <UpSvg /> : <DownSvg />}
      </button>
      <div
        style={{ display: toggle ? 'flex' : 'none' }}
        ref={ref}
        aria-hidden={!toggle}
        className="flex flex-row gap-[2rem] p-4 pt-2 justify-between bg-[#DBEAFE]"
      >
        <span className="">내용</span>
      </div>
    </div>
  );
};
