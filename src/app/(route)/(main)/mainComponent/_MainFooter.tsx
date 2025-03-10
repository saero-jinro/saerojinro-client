'use client';

import Link from 'next/link';
import { AnchorHTMLAttributes } from 'react';

const Footer = () => {
  const footerList = [
    {
      title: '가나',
      url: '#',
    },
    {
      title: '다라마',
      url: 'https://github.com/DonggyunKim00',
    },
    {
      title: '바사아',
      url: 'https://github.com/AhnRian',
    },
    {
      title: '아차카',
      url: 'https://github.com/yungan9',
    },
    {
      title: '나파하',
      url: 'https://github.com/ki2183',
    },
  ];

  return (
    <footer aria-label="footer" className="w-full p-[4rem]">
      <ul id="footer-contents" className="text-center">
        {footerList.map(({ title, url }, idx) => (
          <FooterItem key={idx} url={url}>
            {title}
          </FooterItem>
        ))}

        <FooterItem key="lastItem" url="#" lastIdx={true}>
          <strong>ⓣ 처음처럼.</strong>
        </FooterItem>
      </ul>
    </footer>
  );
};

export default Footer;

interface FooterItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  lastIdx?: boolean;
  url: string;
}

const FooterItem = (props: FooterItemProps) => {
  const { url, lastIdx, ...rest } = props;
  const afterStyle =
    "after:content-[''] after:absolute after:top-[7px] after:bottom-[7px] after:right-0 after:w-[1px] after:bg-[#6666667d]";
  return (
    <li
      className={`${!lastIdx ? afterStyle : ' '} text-[#666] inline-block text-[12px] leading-[15px] p-[5px_11px_5px_10px] relative align-top hover:underline decoration-gray-500`}
    >
      <Link {...rest} href={url} />
    </li>
  );
};
