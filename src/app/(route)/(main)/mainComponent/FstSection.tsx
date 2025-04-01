import Link from 'next/link';
import SectionWrapper from './component/SectionWrapper';
import Image from 'next/image';

const FstSection = () => {
  return (
    <SectionWrapper
      role="region"
      aria-labelledby="conference-title"
      className="relative w-full h-[560px] md:h-[640px] lg:h-[720px] transition-[height] duration-100 ease-in-out"
    >
      {/* 배경 이미지 대체 */}
      <Image src="/main/mainImg.webp" alt="" fill priority className="object-cover" />

      {/* 제목과 소개 */}
      <div className=" relative max-w-7xl z-10 w-full text-[#fff] h-full px-4 md:px-[40px] py-[64px] mx-auto flex flex-col justify-center">
        <article className="flex flex-col">
          <h1
            id="conference-title"
            className="    
            
            text-[22px]
            sm:text-[38px]
            md:text-[44px]
            lg:text-[52px] font-semibold transition-[font-size] duration-200 ease-in-out"
          >
            혁신이 시작되는 곳, IT 컨퍼런스 2025
          </h1>
          <div
            className="
              text-sm
              sm:text-base  
              md:text-lg    
              lg:text-2xl  
              mt-[4px] text-[#E0E0E0] transition-[font-size] duration-200 ease-in-out"
          >
            <p className="break-words whitespace-pre-wrap">
              업계를 선도하는 전문가들이 전하는 인사이트와 네트워킹 기회!
            </p>
            <p className=" break-words whitespace-pre-wrap">
              IT의 무한한 가능성을 확인하고 더 나은 내일을 준비하세요.
            </p>
          </div>
        </article>

        {/* 일정 정보 */}
        <article className="mt-[18px] md:mt-8" aria-labelledby="conference-schedule">
          <h2 id="conference-schedule" className="sr-only">
            컨퍼런스 일정
          </h2>
          <time
            dateTime="2025-03-05"
            className="text-sm md:text-[19px] lg:text-2xl font-semibold transition-[font-size] duration-200 ease-in-out"
          >
            <span className="mr-3">일정</span> <span>2025. 4. 1 ~ 4. 3 (3일간)</span>
          </time>
        </article>

        {/* 컨퍼런스 신청 버튼 */}
        <div className="mt-8 md:mt-12">
          <Link
            href="/lecture-list"
            className="flex items-center font-semibold justify-center bg-[#00249C] w-[160px] text-sm h-11 px-4 py-[6px] rounded-[4px] md:text-base md:w-[300px] md:h-12 md:px-4 md:py-1 md:rounded-[2px] hover:brightness-90"
            aria-label="참가 등록하기"
          >
            참가 등록하기
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FstSection;
