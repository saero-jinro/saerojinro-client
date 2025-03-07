import Link from 'next/link';

const Page = () => {
  return (
    <div className="w-screen h-screen flex gap-2.5 justify-center items-center ">
      <Link className="text-blue-500 underline" href="test/write">
        쓰기
      </Link>
      <Link className="text-blue-500 underline" href="test/correct">
        수정
      </Link>
      <Link className="text-blue-500 underline" href="test/view">
        보기
      </Link>
    </div>
  );
};

export default Page;
