import SectionWrapper from './component/SectionWrapper';
import SectionList from './component/SectionList';

const SecSection = async () => {
  const DATE = '2025-04';
  const DAY = 1;

  return (
    <>
      <SectionWrapper
        role="region"
        aria-labelledby="introduce-sections"
        className="w-screen select-none bg-[#F8FAFC] dark:bg-[#02050C]"
      >
        <div className="max-w-[1280px] w-screen mx-auto h-auto md:min-h-[800px]">
          <div className="mx-auto flex flex-col gap-6 px-4 py-[64px] md:px-[40px]">
            <h2
              id="introduce-sections"
              className="text-xl md:text-[32px] font-bold text-[#212121] dark:text-[#FFFFFF]"
            >
              강연 소개
            </h2>
            {/* 세션 리스트 */}
            <SectionList startDay={DAY} startDate={DATE} />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};

export default SecSection;
