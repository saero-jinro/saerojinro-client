import FAQItem from './component/FAQItem';

export type FAQItemType = {
  title: string;
  contents: string;
};

//FAQ
const FourthSection = () => {
  const FAQDtos: FAQItemType[] = [
    {
      title: '세션은 언제까지 예약할 수 있나요?',
      contents: '세션 예약은 강의 시작 하루 전까지 가능합니다.',
    },
    {
      title: '세션을 예약하지 않아도 강의를 들을 수 있나요?',
      contents: '현장에서도 세션 신청이 가능합니다. 단, 현장 신청은 전체 인원의 20%로 제한됩니다.',
    },
    {
      title: '세션을 예약했는데 어디서 볼 수 있나요?',
      contents: '신청한 세션은 ‘시간표’ 페이지에서 확인할 수 있으며, 수정 및 관리도 가능합니다.',
    },
  ];
  return (
    <>
      <section aria-labelledby="FAQ" className="bg-[#0F172B] dark:bg-[#161F2E] w-screen">
        <div className="px-4 md:px-[40px] py-[52px] md:py-[100px] w-full max-w-[1280px] flex flex-col mx-auto">
          <h2
            id="FAQ"
            className="text-xl md:text-[32px] mb-5 md:mb-6 flex items-center justify-center font-bold text-white"
          >
            FAQ
          </h2>
          <div className="rounded-[4px] overflow-hidden">
            {FAQDtos.map((item) => (
              <FAQItem key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
export default FourthSection;
