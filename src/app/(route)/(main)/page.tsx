import Footer from './mainComponent/_MainFooter';
import FstSection from './mainComponent/FstSection';
import SecSection from './mainComponent/SecSection';
import TrdSection from './mainComponent/TrdSection';
import FourthSection from './mainComponent/FourthSection';

const Page = () => {
  return (
    <div className="w-screen">
      <div className="w-screen flex flex-col mx-auto">
        <main>
          <FstSection />
          <SecSection />
          <TrdSection />
          <FourthSection />
        </main>
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
//   speakerName={lecture.speakerName}
//   isProfile={false}
// />
