import SectionWrapper from './component/SectionWrapper';
import { LoadingMapImg } from './component/kakaoMap';
import Image from 'next/image';

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
      className="px-4 py-[52px] md:py-16 md:px-10 max-w-7xl overflow-x-hidden"
    >
      {/* 제목 */}
      <div className="mb-6">
        <h2 id="conference-location" className="text-xl md:text-[32px] font-bold">
          컨퍼런스 위치
        </h2>
      </div>

      <div className="flex flex-col lg:grid lg:[grid-template-columns:400px_auto] self-stretch">
        {/* 정보 */}
        <div className="flex flex-col gap-6 lg-gap-10">
          {info.map((item, idx) => (
            <LocationList key={idx + item.title} {...item} />
          ))}
        </div>

        {/* 지도 */}
        <div aria-label="location-map" className="w-auto mt-6 lg:mt-0">
          <div className="ml-auto w-full lg:max-w-[720px] relative overflow-hidden h-[181px] md:h-[280px]">
            {/* <KakaoMap /> */}
            <div className="w-full h-full relative overflow-hidden">
              <LoadingMapImg />
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
export default TrdSection;

/** 컴포넌트 **/
// #region
type svgName = 'pin' | 'bus' | 'subway';
// 아이콘
const Icon = ({ name }: { name: svgName }) => {
  return <Image alt={`img-${name}`} width={24} height={24} src={`/main/${name}.webp`} />;
};

// 장소 리스트
const LocationList = ({ content, title }: Info) => {
  return (
    <article className="flex flex-col gap-4">
      <h3 className="text-base md:text-xl font-bold">{title}</h3>
      <ul>
        {content.map(({ info, icon }, idx) => (
          <li key={idx + info} className="flex items-center">
            <Icon name={icon} />
            <p className="ml-2 text-sm md:text-lg font-medium">{info}</p>
          </li>
        ))}
      </ul>
    </article>
  );
};
// #endregion
