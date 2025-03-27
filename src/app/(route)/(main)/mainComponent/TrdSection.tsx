import SectionWrapper from './component/SectionWrapper';
import KakaoMap from './component/kakaoMap';
import TrdIcon from './component/TrdIcon';

type Info = {
  title: string;
  content: Array<{
    icon: svgName;
    info: string;
  }>;
};

const TrdSection = () => {
  const info: Info[] = [
    {
      title: '행사 장소',
      content: [
        {
          icon: 'pin',
          info: '코엑스 컨벤션 센터 서울특별시 강남구 영동대로 51',
        },
      ],
    },
    {
      title: '교통 & 접근 방법',
      content: [
        {
          icon: 'bus',
          info: '버스 이용시 코엑스 동문, 무역센터 정류장 하차',
        },
        {
          icon: 'subway',
          info: '지하철 이용시 2호선 삼성역, 9호선 봉은사역',
        },
      ],
    },
  ];

  return (
    <SectionWrapper
      aria-labelledby="conference-location"
      className="max-w-7xl py-[52px] px-4 md:py-20 md:px-10 md:gap-6 flex flex-col text-[#212121] dark:text-[#fff]"
    >
      {/* px-4 py-[52px] h-[413px] sec3:h-[550px] flex flex-col justify-center overflow-x-hidden" */}

      {/* 제목 */}
      <div>
        <h2 id="conference-location" className="text-xl md:text-[32px] font-bold block">
          컨퍼런스 위치
        </h2>
      </div>

      {/* <div className="flex flex-col lg:grid lg:[grid-template-columns:400px_auto] self-stretch"> */}
      {/* <div className="flex flex-row justify-between self-stretch sec3:flex-row"> */}
      <div className="flex flex-col xl:flex-row justify-between w-full">
        {/* 정보 */}
        <div className="flex flex-col justify-center gap-10">
          {info.map((item, idx) => (
            <LocationList key={idx + item.title} {...item} />
          ))}
        </div>

        {/* 지도 */}
        <div
          aria-label="location-map"
          className="mt-13 xl:mt-6 w-full xl:w-auto xl:h-[387.563px] aspect-video bg-black "
        >
          <KakaoMap />
        </div>
      </div>
    </SectionWrapper>
  );
};
export default TrdSection;

/** 컴포넌트 **/
// #region
type svgName = 'pin' | 'bus' | 'subway';

// 장소 리스트
const LocationList = ({ content, title }: Info) => {
  return (
    <article className="flex flex-col gap-4">
      <h3 className="text-base md:text-xl font-bold">{title}</h3>
      <ul className="flex flex-col gap-3">
        {content.map(({ info, icon }, idx) => (
          <li key={idx + info} className="flex items-center">
            <TrdIcon name={icon} />
            <p className="ml-2 text-sm md:text-lg font-medium">{info}</p>
          </li>
        ))}
      </ul>
    </article>
  );
};
// #endregion
