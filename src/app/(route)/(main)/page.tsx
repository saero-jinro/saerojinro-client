import Footer from './mainComponent/_MainFooter';
import FourthSection from './mainComponent/FourthSection';
import FstSection from './mainComponent/FstSection';
import SecSection from './mainComponent/SecSection';
import TrdSection from './mainComponent/TrdSection';

const Page = () => {
  return (
    <div className="w-screen h-screen">
      <div className="w-screen flex flex-col gap-[2rem]">
        <FstSection />
        <SecSection />
        <TrdSection />
        <FourthSection />
        <Footer />
      </div>
    </div>
  );
};

export default Page;

// 나중에 카드 컴포넌트 사용하실 때 아래처럼 사용하시면 됩니다
// <Card
//   key={lecture.id}
//   id={lecture.id}
//   image={lecture.image}
//   title={lecture.title}
//   category={lecture.category}
//   time={`${formatTime(lecture.start_time)} ~ ${formatTime(lecture.end_time)}`}
//   showWish={true}
// >
//   <div className="flex items-center mt-1">
//     <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
//     <p className="text-sm font-semibold">{lecture.speakerName}</p>
//   </div>
// </Card>;
