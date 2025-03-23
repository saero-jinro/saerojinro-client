import Footer from './mainComponent/_MainFooter';
import FstSection from './mainComponent/FstSection';
import SecSection from './mainComponent/SecSection';
import TrdSection from './mainComponent/TrdSection';
import FourthSection from './mainComponent/FourthSection';

const Page = () => {
  return (
    <div className="w-screen">
      <div className="flex flex-col mx-auto">
        <main>
          <FstSection />
          <SecSection />
          <TrdSection />
          <FourthSection />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
