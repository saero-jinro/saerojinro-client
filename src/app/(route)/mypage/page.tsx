import { MyProfileEmail, MyProfileName, MyProileImage } from './component/dataComponents';
import { LogoutButton, UserDeleteButton } from './component/handleButton';

const Page = () => {
  return (
    <div className="min-w-[343px] flex items-center justify-center md:h-[calc(100vh-80px)] w-screen max-w-[788px] mx-auto bg-white">
      <div className=" py-16 px-[40px] h-auto w-full flex flex-col mt-16 text-sm md:text-base">
        {/* 정보 */}
        <div className="flex md:flex-row flex-col gap-6">
          <MyProileImage />

          <div className="flex flex-col w-full gap-5">
            <MyProfileName />
            <MyProfileEmail />
          </div>
        </div>
        {/* 로그아웃 */}
        <LogoutButton />
        {/* 회원탈퇴 */}
        <UserDeleteButton />
      </div>
      <div />
    </div>
  );
};

export default Page;
