'use client';

const TrdSection = () => {
  return (
    <section className="w-full h-auto px-[100px] py-[120px]">
      <div className="grid grid-cols-2 h-[365px]">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold">행사 위치</h1>
          <span className="mt-4">오시는 방법: 원당로 35</span>
          <span>blurrrr</span>
        </div>
        <div className="w-[90%] h-[90%] mt-auto mx-auto bg-gray-400 flex justify-center items-center text-gray-700">
          오시는 길
        </div>
      </div>
    </section>
  );
};
export default TrdSection;
