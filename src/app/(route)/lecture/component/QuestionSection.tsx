import { TextareaHTMLAttributes, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import useHeaderStore from '@/_store/Header/useHeaderStore';
import useAuthStore from '@/_store/auth/useAuth';
import useLoginModalStore from '@/_store/modal/useLoginModalStore';
import UserSVG from '@/assets/Lecture/Regular.svg';

interface QuestionProps {
  id: number;
  content: string;
  userName: string;
  profileImage: string;
  userId?: number;
  isWriter: boolean;
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
  const params = useParams();
  const lectureId = params.id as string;
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;
  const accessToken = useAuthStore((store) => store.state.accessToken);
  const [text, setText] = useState('');
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const showPopup = useHeaderStore((store) => store.popup.actions.showPopup);
  const { open: openLoginModal } = useLoginModalStore();
  const [multilineMap, setMultilineMap] = useState<Record<number, boolean>>({});
  const contentRefs = useRef<Record<number, HTMLParagraphElement | null>>({});

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/questions/lectures/${lectureId}`, {
        method: 'GET',
        headers: {
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      });

      if (!response.ok) {
        throw new Error('네트워크 응답 오류');
      }
      const data = await response.json();
      console.log(data);
      const questionList: QuestionProps[] = data.questionList;
      setQuestions(questionList);

      requestAnimationFrame(() => {
        const newMap: Record<number, boolean> = {};
        questionList.forEach((q) => {
          const el = contentRefs.current[q.id];
          if (el) {
            const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
            const lines = el.clientHeight / lineHeight;
            newMap[q.id] = lines >= 2;
          }
        });
        setMultilineMap(newMap);
      });
    } catch (error) {
      console.error('데이터 불러오기 실패: ', error);
    }
  };

  const handleSubmit = async () => {
    if (!accessToken) {
      openLoginModal();
      return;
    }

    if (!text.trim()) return;

    try {
      const response = await fetch(`${BASE_URL}/api/questions/lectures/${lectureId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        body: JSON.stringify({
          content: text,
        }),
      });

      if (!response.ok) {
        throw new Error('질문 등록 실패');
      }

      fetchQuestions();

      setText('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${BASE_URL}/api/questions/${id}`, {
        method: 'DELETE',
        headers: {
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      });

      if (!response.ok) {
        throw new Error('질문 삭제 실패');
      }

      await fetchQuestions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = (question: QuestionProps) => {
    setEditingId(question.id);
    setEditingContent(question.content);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/questions/${editingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        body: JSON.stringify({
          content: editingContent,
        }),
      });

      if (!response.ok) {
        throw new Error('질문 수정 실패');
      }

      await fetchQuestions();
      setEditingId(null);
      setEditingContent('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold self-stretch max-md:text-xl">사전 질문</h2>
      <div className="flex gap-6 max-md:gap-4">
        <div className="flex items-center justify-center resize-none w-full bg-[#F1F5F9] dark:bg-[#0D121E] rounded-xs focus-within:outline outline-[#015AFF] focus-within:bg-white dark:focus-within:outline-[#003AA5] dark:focus-within:bg-[#070A12]">
          <Textarea
            placeholder="사전 질문을 작성해 주세요."
            className="text-[#212121] dark:text-white w-full border-none min-h-6 overflow-hidden resize-none border px-4 rounded-md focus:outline-none max-md:text-sm max-md:px-0"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={1}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="btn font-semibold text-base max-md:text-sm rounded-xs whitespace-nowrap px-4 max-md:py-1.5 py-1 h-12 max-md:h-11 overflow-hidden cursor-pointer bg-[#015AFF] dark:bg-[#003AA5]"
        >
          등록
        </button>
      </div>

      <div className="mt-6 max-md:mt-5 flex flex-col gap-3">
        {questions.length === 0 ? (
          <p className="text-[#757575] text-sm font-medium text-center">등록된 질문이 없습니다.</p>
        ) : (
          questions.map((question) => (
            <div
              key={question.id}
              className={`relative flex flex-col gap-2 md:flex-row md:gap-6 ${
                multilineMap[question.id] ? 'md:items-start' : 'md:items-center'
              }`}
            >
              <div className="flex justify-between">
                <div className="flex items-center gap-1 min-w-20">
                  <div className="w-8 h-8 rounded-xs overflow-hidden">
                    {question.profileImage ? (
                      <img
                        src={question.profileImage}
                        alt="프로필 이미지"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <UserSVG />
                    )}
                  </div>
                  <span
                    className="font-semibold text-base text-[#212121] dark:text-white truncate block max-w-20"
                    title={question.userName || 'user'}
                  >
                    {question.userName || 'user'}
                  </span>
                </div>

                {question.isWriter && (
                  <div className="md:absolute md:right-0 md:top-0 flex gap-2">
                    {editingId === question.id ? (
                      <>
                        <button onClick={handleSave}>저장</button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditingContent('');
                          }}
                        >
                          취소
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditClick(question)}
                          className="cursor-pointer font-medium text-base text-[#424242] dark:text-[#CAD5E2]"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => {
                            showPopup({
                              contents: '정말 삭제하시겠습니까?',
                              func: () => handleDelete(question.id),
                            });
                          }}
                          className="cursor-pointer font-medium text-base text-[#424242] dark:text-[#CAD5E2]"
                        >
                          삭제
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="w-full md:pr-[100px]">
                {editingId === question.id ? (
                  <Textarea
                    value={editingContent}
                    spellCheck={false}
                    onChange={(e) => setEditingContent(e.target.value)}
                    className="resize-none w-full overflow-hidden rounded-[4px] border border-solid border-[#015AFF] p-2"
                  />
                ) : (
                  <p
                    className="font-normal text-base text-[#212121] dark:text-white"
                    ref={(el: HTMLParagraphElement | null) => {
                      contentRefs.current[question.id] = el;
                    }}
                  >
                    {question.content}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default QuestionSection;
