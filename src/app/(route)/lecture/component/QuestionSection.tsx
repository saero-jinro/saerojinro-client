import { TextareaHTMLAttributes, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import useHeaderStore from '@/_store/Header/useHeaderStore';
import useAuthStore from '@/_store/auth/useAuth';
import UserSVG from '@/assets/Lecture/Regular.svg';

interface QuestionProps {
  id: number;
  content: string;
  userName: string;
  profileImage: string;
  userId?: number;
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
  const myName = useAuthStore((store) => store.state.name);
  const [text, setText] = useState('');
  const [questions, setQuestions] = useState<QuestionProps[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const showPopup = useHeaderStore((store) => store.popup.actions.showPopup);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/questions/lectures/${lectureId}`);
      if (!response.ok) {
        throw new Error('네트워크 응답 오류');
      }
      const data = await response.json();
      console.log(data);
      const questionList: QuestionProps[] = data.questionList;
      setQuestions(questionList);
    } catch (error) {
      console.error('데이터 불러오기 실패: ', error);
    }
  };

  const handleSubmit = async () => {
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
      <h2 className="text-2xl font-bold self-stretch">사전 질문</h2>
      <div className="flex gap-6">
        <div className="flex items-center justify-center resize-none w-full bg-[#F1F5F9] px-4 rounded-xs">
          <Textarea
            placeholder="강의 중 다뤄졌으면 하는 질문을 자유롭게 입력해주세요."
            className="w-full border-none min-h-6 overflow-hidden resize-none border px-3 rounded-md focus:outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={1}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="btn font-semibold text-base rounded-xs px-4 py-1 w-[62px] h-12 overflow-hidden cursor-pointer"
        >
          등록
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {questions.length === 0 ? (
          <p className="text-[#757575] text-sm font-medium text-center">등록된 질문이 없습니다.</p>
        ) : (
          questions.map((question) => (
            <div
              key={question.id}
              className="flex justify-between items-start gap-6 self-stretch relative"
            >
              <div className="absolute flex w-fit max-w-28 min-h-8 gap-1">
                <div className="w-8 h-8 rounded-full overflow-hidden">
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
                <div className="flex items-center">
                  <span
                    className="font-semibold text-base truncate block max-w-20"
                    title={question.userName || 'user'}
                  >
                    {question.userName || 'user'}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 items-center min-h-8 md:pt-0 md:mx-[calc(72px+24px+24px)]">
                {editingId === question.id ? (
                  <Textarea
                    value={editingContent}
                    spellCheck={false}
                    onChange={(e) => setEditingContent(e.target.value)}
                    className="resize-none w-full overflow-hidden rounded-[4px] border border-solid border-[#015AFF] p-2"
                  />
                ) : (
                  <p className="font-normal text-base">{question.content}</p>
                )}
              </div>
              {question.userName == myName && (
                <div className="absolute h-[46px] right-0 flex gap-6 items-start">
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
                        className="cursor-pointer font-medium text-base"
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
                        className="cursor-pointer font-medium text-base"
                      >
                        삭제
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default QuestionSection;
