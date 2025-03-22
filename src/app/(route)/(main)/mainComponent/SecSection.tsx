import SectionWrapper from './component/SectionWrapper';
import SectionList from './component/SectionList';
import { Lectures, temporaryLectures } from '@/_types/Lectures/lectures.type';
import { getLectures } from '@/_utils/Main/getLectures';

const SecSection = async () => {
  const DAY = 1;
  const DATE = '2025-03';
  let isLecturesFetched = false;
  let lectures: Lectures = temporaryLectures;

  try {
    const data = await getLectures(DATE, DAY);
    lectures = data;
    console.log(lectures);
    isLecturesFetched = true;
  } catch (error) {
    console.error('강의 로드 실패: 테스트 데이터로 대체', error);
    lectures = temporaryLectures;
  }

  return (
    <>
      <SectionWrapper
        role="region"
        aria-labelledby="introduce-sections"
        className="absolute mx-auto select-none left-1/2 -translate-x-1/2 bg-[#EBEBEB]"
      >
        <div className="relative left-1/2 -translate-x-1/2 min-w-[100vw]"></div>
        <div className="max-w-[1280px] mx-auto">
          <div className="mx-auto flex flex-col gap-3 px-[40px] py-[120px]">
            <h2 id="introduce-sections" className="text-[32px] font-bold">
              세션소개
            </h2>
            {/* 세션 리스트 */}
            <SectionList
              startDay={DAY}
              startDate={DATE}
              initLectures={lectures}
              isLecturesFetched={isLecturesFetched}
            />
          </div>
        </div>
      </SectionWrapper>
      <div className="h-[737px]" />
    </>
  );
};

export default SecSection;
