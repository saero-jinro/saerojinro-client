import { TextareaHTMLAttributes, useEffect, useRef, useState } from 'react';
import useHeaderStore from '@/_store/Header/useHeaderStore';
import UserSVG from '@/assets/Lecture/Regular.svg';

interface QuestionProps {
  id: number;
  user_id: number;
  lecture_id: number;
  contents: string;
}

// 크기 자동 조절 textArea
const Textarea = ({
  className = '',
  value = '',
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const resize = useHeaderStore((store) => store.viewport.state.width);
  const state = value ?? '';
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [state, ref, resize]);

  return <textarea rows={1} ref={ref} value={value} className={className} {...props} />;
};

const QuestionSection = () => {
  const [text, setText] = useState('');
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [review, setReview] = useState('소프트웨어 엔지니어가 강연하는 디자이너?? 이거 진짜예요?');

  return (
    <>
      <h2 className="text-2xl font-bold self-stretch">사전 질문</h2>
      <div className="flex gap-6">
        <div className="flex items-center justify-center resize-none w-full bg-[#F1F5F9] text-[#BDBDBD] px-4 rounded-xs">
          <Textarea
            placeholder="강연자에게 질문하고 싶은 것을 입력해주세요. 등록된 사전질문은 작성자와 강연자에게만 보입니다."
            className="w-full border-none min-h-6 overflow-hidden resize-none border px-3 rounded-md focus:outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={1}
          />
        </div>
        <button className="btn font-semibold text-base rounded-xs px-4 py-1 w-[62px] h-12 overflow-hidden">
          등록
        </button>
      </div>

      <div className="flex items-start gap-6 self-stretch relative">
        <div className="absolute flex h-[46px] w-[78px] items-center gap-1">
          <div className="w-8 h-8 gap-1">
            <UserSVG />
          </div>
          <div>
            <span className="font-semibold text-base">닉네임</span>
          </div>
        </div>
        <div className="flex-1 pt-8 mt-2 md:pt-0 md:mx-[calc(72px+24px+24px)]">
          <p>
            도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배
            도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배
            도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배 도배
          </p>
        </div>
        <div className="absolute h-[46px] right-0 flex gap-6 items-center ">
          <button>수정</button>
          <button>삭제</button>
        </div>
      </div>

      {/* 수정 가능 댓글 */}
      <div className="flex items-start gap-6 self-stretch relative">
        <div className="flex w-[78px] h-[46px] items-center gap-1 absolute ">
          <div className="w-8 h-8 gap-1">
            <UserSVG />
          </div>
          <div>
            <span className="font-semibold text-base">닉네임</span>
          </div>
        </div>
        <div className="flex-1 pt-8 mt-2 md:pt-0 md:mx-[calc(72px+24px+24px)]">
          <div className="flex items-center justify-center w-full">
            <Textarea
              value={review}
              spellCheck={false}
              onChange={(e) => setReview(e.target.value)}
              className="resize-none w-full overflow-hidden border-none outline-none rounded-[4px] py-2 focus:px-2 focus:border focus:border-solid focus:border-[#1677FF]"
            />
          </div>
        </div>
        <div className="absolute h-[46px] right-0 flex gap-6 items-center">
          <button>수정</button>
          <button>삭제</button>
        </div>
      </div>
    </>
  );
};

export default QuestionSection;
