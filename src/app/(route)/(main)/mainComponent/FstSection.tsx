import Link from 'next/link';
import SectionWrapper from './component/SectionWrapper';

const FstSection = () => {
  return (
    <SectionWrapper
      role="region"
      aria-labelledby="conference-title"
      className="w-full mx-auto mt-[60px] flex flex-col gap-8 px-[40px] py-[160px] max-w-7xl"
    >
      {/* 제목과 소개 */}
      <article>
        <h1 id="conference-title" className="text-5xl font-bold">
          혁신이 시작되는 곳, IT 컨퍼런스 2025
        </h1>
        <p className="w-[50%] break-words whitespace-pre-wrap text-2xl mt-[8px]">
          업계를 선도하는 전문가들이 전하는 인사이트와 네트워킹 기회! IT의 무한한 가능성을 확인하고
          더 나은 내일을 준비하세요.
        </p>
      </article>

      {/* 일정 정보 */}
      <article aria-labelledby="conference-schedule">
        <h2 id="conference-schedule" className="sr-only">
          컨퍼런스 일정
        </h2>
        <time className="text-2xl font-bold" dateTime="2025-03-05">
          일정: 2025. 3. 5 ~ 3. 7 (3일간)
        </time>
      </article>

      {/* 컨퍼런스 신청 버튼 */}
      <div>
        <Link
          href="/lecture-list"
          className="btn px-4 py-2 rounded-[8px]"
          aria-label="컨퍼런스 신청하기"
        >
          컨퍼런스 신청하기
        </Link>
      </div>
    </SectionWrapper>
  );
};

export default FstSection;
