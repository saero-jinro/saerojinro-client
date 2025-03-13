// import KakaoMap from './component/kakaoMap';

const TrdSection = () => {
  return (
    <section className="w-full h-auto px-[100px] max-md:px-[30px] py-[120px] max-w-[1280px] mx-auto">
      <div className="mb-[3rem]">
        <h1 className="text-4xl font-bold">행사 위치</h1>
      </div>

      <div className="grid [grid-template-columns:250px_1fr]  h-auto w-[100%] max-md:w-[100%] mx-auto max-md:flex max-md:flex-col">
        <div className=" flex-col ">
          <span className="mt-4">오시는 방법: 원당로 35</span>
          <span>blurrrr</span>
        </div>
        <div className="w-[100%] aspect-video max-md:w-[100%] max-md:h-[100%] mt-auto mx-auto bg-gray-400 flex justify-center items-center text-gray-700 ">
          {/* <KakaoMap /> */}
        </div>
      </div>
    </section>
  );
};
export default TrdSection;
