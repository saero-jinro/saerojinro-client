import Link from 'next/link';

const Page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Link className="w-auto px-2 py-1 bg-gray-500 text-white text-2xl" href="/admin">
        어드민 로그인 버튼
      </Link>
    </div>
  );
};

export default Page;
