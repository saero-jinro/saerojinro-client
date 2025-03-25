import Link from 'next/link';
import SectionWrapper from './component/SectionWrapper';

const FstSection = () => {
  return (
    <SectionWrapper
      role="region"
      aria-labelledby="conference-title"
      className="
    w-full h-[560px] 
    mx-auto flex flex-col gap-8
    bg-[url('/main/mainImg.webp')]
    bg-no-repeat bg-cover bg-center
    md:h-[640px] lg:h-[720px]
    transition-[height] duration-100 ease-in-out
  "
    >
      {/* 제목과 소개 */}
      <div className="max-w-7xl text-[#fff] h-full px-4 md:px-[40px] py-[64px] gap-8 mx-auto flex flex-col justify-center">
        <article className="flex flex-col gap-1">
          <h1
            id="conference-title"
            className="    
            text-[22px]
            sm:text-[28px]
            md:text-[38px]
            lg:text-[52px] font-semibold transition-[font-size] duration-200 ease-in-out"
          >
            혁신이 시작되는 곳, IT 컨퍼런스 2025
          </h1>
          <div className="mt-[8px] text-sm md:text-[19px] lg:text-2xl transition-[font-size] duration-200 ease-in-out">
            <p className="break-words whitespace-pre-wrap">
              업계를 선도하는 전문가들이 전하는 인사이트와 네트워킹 기회!
            </p>
            <p className=" break-words whitespace-pre-wrap">
              IT의 무한한 가능성을 확인하고 더 나은 내일을 준비하세요.
            </p>
          </div>
        </article>

        {/* 일정 정보 */}
        <article aria-labelledby="conference-schedule">
          <h2 id="conference-schedule" className="sr-only">
            컨퍼런스 일정
          </h2>
          <time
            dateTime="2025-03-05"
            className="text-sm md:text-[19px] lg:text-2xl font-semibold transition-[font-size] duration-200 ease-in-out"
          >
            <span className="mr-3">일정</span> <span>2025. 3. 5 ~ 3. 7 (3일간)</span>
          </time>
        </article>

        {/* 컨퍼런스 신청 버튼 */}
        <div>
          <Link
            href="/lecture-list"
            className="bg-[#00249C] w-[160px] md:w-[300px] text-sm md:text-base flex justify-center items-center h-12 px-4 py-1 rounded-[2px] font-semibold"
            aria-label="컨퍼런스 신청하기"
          >
            컨퍼런스 신청하기
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FstSection;
