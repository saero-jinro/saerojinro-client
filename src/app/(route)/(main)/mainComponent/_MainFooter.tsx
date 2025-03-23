const Footer = () => {
  return (
    <footer aria-label="footer" className="px-10 py-10 text-[#757575] bg-black flex">
      <div className="flex flex-col self-stretch max-w-[1280px] gap-4    md:gap-6 mx-auto w-full ">
        <h2 className="font-semibold text-lg md:text-2xl">IT TIME</h2>
        <div className="flex flex-col gap-2 md:gap-3 text-sm md:text-base">
          <span>© 2025 IT Conference. All rights reserved</span>
          <span>개인정보방침</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
