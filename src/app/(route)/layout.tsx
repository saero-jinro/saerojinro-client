import '@/_styles/globals.css';
import Header from '../_components/Header/Header';
import getTheme from '../_utils/Header/getTheme.server';
import KaKaoScript from '@/_components/Script/Login.script';
import LayoutWrapper from '@/_components/LayoutWrapper';

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const theme = await getTheme();

  return (
    <html lang="ko" className={theme === 'dark' ? 'dark' : ''}>
      <body
        className={
          'antialiased w-screen h-screen bg-[#F8FAFC] text-black dark:bg-[#02050C] dark:text-white'
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
