import SectionWrapper from './component/SectionWrapper';
import KakaoMap from './component/kakaoMap';

const TrdSection = () => {
  return (
    <SectionWrapper
      aria-labelledby="conference-location"
      className="py-[120px] px-[40px] max-w-7xl"
    >
      <div className="mb-[3rem]">
        <h2 id="conference-location" className="text-4xl font-bold">
          컨퍼런스 위치
        </h2>
      </div>
      <div className="grid [grid-template-columns:400px_716px] gap-[84px] h-auto w-[100%] max-md:w-[100%] mx-auto max-md:flex max-md:flex-col">
        <article className="flex-col flex gap-[35px]">
          <div>
            <span className="text-xl font-bold">행사 장소</span>
            <ul>
              <li className="mt-4 flex flex-row gap-2 text-lg">
                <div aria-hidden="true" className="w-6 h-6 bg-gray-300 rounded-[8px]" />
                <span>코엑스 컨벤션 센터 서울특별시 강남구 영동대로</span>
              </li>
            </ul>
          </div>

          <div aria-labelledby="transport-info">
            <span id="transport-info" className="text-xl font-bold">
              교통 & 접근 방법
            </span>
            <ul>
              <li className="mt-4 flex flex-row gap-2 text-lg">
                <div aria-hidden="true" className="w-6 h-6 bg-gray-300 rounded-[8px]" />
                <span>버스 이용시 코엑스 동문, 무역센터 정류장 하차</span>
              </li>
              <li className="mt-4 flex flex-row gap-2 text-lg">
                <div aria-hidden="true" className="w-6 h-6 bg-gray-300 rounded-[8px]" />
                <span>지하철 이용시 2호선 삼성역, 9호선 봉은사역</span>
              </li>
            </ul>
          </div>
        </article>

        <div
          aria-label="location-map"
          className="w-[100%] aspect-video max-md:w-[100%] max-md:h-[100%] mt-auto mx-auto flex justify-center items-center text-gray-700 "
        >
          <KakaoMap />
        </div>
      </div>
    </SectionWrapper>
  );
};
export default TrdSection;
