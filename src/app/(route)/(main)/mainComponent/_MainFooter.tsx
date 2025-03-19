const Footer = () => {
  return (
    <footer
      aria-label="footer"
      className="px-[40px] py-[48px] min-w-[768px] max-w-[1280] flex flex-col self-stretch text-white bg-[#202427] gap-6"
    >
      <h2 className="font-bold text-4xl">IT TIME</h2>
      <div className="flex flex-col gap-6">
        <span>© 2025 IT Conference. All rights reserved</span>
        <span>개인정보방침</span>
      </div>
    </footer>
  );
};

export default Footer;
