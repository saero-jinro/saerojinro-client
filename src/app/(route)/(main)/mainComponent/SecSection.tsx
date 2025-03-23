import SectionWrapper from './component/SectionWrapper';
import SectionList from './component/SectionList';

const SecSection = async () => {
  const DATE = '2025-03';
  const DAY = 5;

  return (
    <>
      <SectionWrapper
        role="region"
        aria-labelledby="introduce-sections"
        className="w-screen select-none"
      >
        <div className="max-w-[1280px] w-screen mx-auto">
          <div className="mx-auto flex flex-col gap-6 px-4 py-[64px] md:px-[40px]">
            <h2 id="introduce-sections" className="text-[32px] font-bold">
              세션소개
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
