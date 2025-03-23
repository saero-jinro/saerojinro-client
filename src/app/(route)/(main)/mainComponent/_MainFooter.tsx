const Footer = () => {
  return (
    <footer aria-label="footer" className="px-[40px] py-[48px] text-white bg-[#202427] flex">
      <div className="flex flex-col self-stretch max-w-[1280px] gap-6 mx-auto w-full ">
        <h2 className="font-bold text-4xl">IT TIME</h2>
        <div className="flex flex-col gap-6">
          <span>© 2025 IT Conference. All rights reserved</span>
          <span>개인정보방침</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
