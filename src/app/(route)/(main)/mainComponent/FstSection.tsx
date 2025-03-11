'use client';
import TextViewer from '@/_components/TextViewer/TextViewer';
import SectionWrapper from './component/SectionWrapper';

const FstSection = () => {
  const dumydto = `{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"행사 소개"}]},{"type":"paragraph","content":[{"type":"text","text":"매년 7만 여명의 관람객이 방문하고 450여개사가 참가하는 국내 최대 ICT 전문 전시회. 비즈니스 커넥팅, ICT 콘퍼런스, 신제품&신기술 발표회 등 여러가지 부대 행사 개최로 다양한 비즈니스 기회를 창출하며 빠르게 변화하는 디지털전환 시대에서 나아가야 할 미래를 앞서 선보입니다."}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"입장료"}]},{"type":"paragraph","content":[{"type":"text","text":"10,000원"}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"전시품목"}]},{"type":"paragraph","content":[{"type":"text","text":"ICT Convergence (5G&AI&IoT) / Digital Twin & Metaverse / Smart Living & Health Care / Robotics / Intelligent Mobility / Block Chain & Security /Quantum information technology"},{"type":"hardBreak"}]},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"주최"}]},{"type":"paragraph","content":[{"type":"text","text":"과학기술정보통신부"}]},{"type":"paragraph"},{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"주관"}]},{"type":"paragraph","content":[{"type":"text","text":"한국무역협회, 한국경제신문, 전자신문, 코엑스, 케이훼어스, 한국정보통신진흥협회"}]}]}`;

  return (
    <SectionWrapper className="max-w-[1280px] mx-auto mt-[60px]">
      <h1 className="text-3xl font-bold mb-3">World it Show</h1>
      <TextViewer content={dumydto} />
      <button className="mt-[1rem] w-full h-[2.5rem] font-bold bg-gray-200 dark:bg-gray-800">
        참가 신청
      </button>
    </SectionWrapper>
  );
};
export default FstSection;
