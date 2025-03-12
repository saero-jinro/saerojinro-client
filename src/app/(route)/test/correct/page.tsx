import TextEditor from '@/_components/TextEditor/TextEditor';
import { ApiResponse } from '@/api/test/getTextDto/route';

type GetTextDtoResponse = ApiResponse<string>;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const Page = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/api/test/getTextDto`);

    if (!res.ok) {
      throw new Error(`API 요청 실패: ${res.status}`);
    }

    const data: GetTextDtoResponse = await res.json();

    if (!data.ok || !data.data) {
      throw new Error(data.error || '데이터 없음.');
    }

    return (
      <div className="pt-[4rem]">
        <TextEditor className="w-[80%] px-3 py-5 mx-auto bg-[#ffffff1b]" content={data.data} />
      </div>
    );
  } catch {
    return (
      <div>
        <TextEditor className="w-[80%] px-3 py-5 mx-auto bg-[#ffffff1b]" content={null} />
      </div>
    );
  }
};

export default Page;
