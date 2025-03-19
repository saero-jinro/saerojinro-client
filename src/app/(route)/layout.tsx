import '@/_styles/globals.css';
import Header from '../_components/Header/Header';
import getTheme from '../_utils/Header/getTheme.server';
import KaKaoScript from '@/_components/Script/Login.script';

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const theme = await getTheme();

  return (
    <html lang="ko" className={theme === 'dark' ? 'dark' : ''}>
      <body
        className={
          'antialiased w-screen h-screen bg-white text-black dark:bg-black dark:text-white'
        }
      >
        <KaKaoScript />
        <Header />
        <div className="pt-[81px] max-w-7xl mx-auto my-0 relative">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
