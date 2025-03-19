import LoginComponent from '@/_components/Login/LoginComponent';

// 모바일에서 로그인을 클릭하면 여기로 리다이렉트 됨
const Page = () => {
  return (
    <div className="w-full h-[70vh] flex justify-center items-center">
      <LoginComponent className="scale-70" />
    </div>
  );
};

export default Page;
