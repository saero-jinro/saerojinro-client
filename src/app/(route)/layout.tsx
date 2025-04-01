import '@/_styles/globals.css';
import Header from '../_components/Header/Header';
import getTheme from '../_utils/Header/getTheme.server';
import KaKaoScript from '@/_components/Script/Login.script';
import LayoutWrapper from '@/_components/LayoutWrapper';

export const metadata = {
  title: 'ittime',
  description: '대규모 it 컨퍼런스 사이트',
  authors: [
    { name: '서예은', url: 'https://github.com/syeeun09' },
    { name: '고경', url: 'https://github.com/kyung412' },
    { name: '이신행', url: 'https://github.com/LeeShinHaeng' },
    { name: '박민준', url: 'https://github.com/minjo-on' },
    { name: '유동우', url: 'https://github.com/fbehddn' },
    { name: '서동우', url: 'https://github.com/SD-gif' },
    { name: '김준아', url: 'https://github.com/junaanjuna' },
    { name: '황효주', url: 'https://github.com/hjoo830' },
    { name: '김기준', url: 'https://github.com/ki2183' },
  ],
  creator: '처음처럼',
  publisher: 'goorm x kakao 최종 진행 프로젝트',
};

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const theme = await getTheme();

  return (
    <html lang="ko" className={theme === 'dark' ? 'dark' : ''}>
      <body
        className={
          'antialiased w-screen h-screen bg-[#F8FAFC] dark:bg-[#02050C] text-black dark:text-white'
        }
      >
        <KaKaoScript />
        <Header />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
