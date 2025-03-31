import { MyProfileEmail, MyProfileName, MyProileImage } from './component/dataComponents';
import { LogoutButton, UserDeleteButton } from './component/handleButton';
import getTheme from '@/_utils/Header/getTheme.server';
import DarkMode from './component/DarkMode.server';

const Page = async () => {
  const theme = await getTheme();
  return (
    <div className="flex overflow-hidden py-16 px-[40px] bg-white dark:bg-[#070A12] min-h-screen items-center justify-center md:h-auto w-screen max-w-[1280px] mx-auto ">
      <div className="min-w-[343px] h-full w-full md:max-w-[788px] flex flex-col gap-10 mt-16 text-sm md:text-base">
        {/* 정보 */}
        <div className="flex md:flex-row flex-col gap-6">
          <MyProileImage />

          <div className="flex flex-col w-full gap-5">
            <MyProfileName />
            <MyProfileEmail />
          </div>
        </div>

        {/* 다크모드 */}
        <DarkMode theme={theme} />
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
