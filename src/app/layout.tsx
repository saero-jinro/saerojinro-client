import '@/_styles/globals.css';
import { cookies } from 'next/headers';
import Header from './_components/Header/Header.test';

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value ?? '';

  return (
    <html lang="en" className={theme === 'dark' ? 'dark' : ''}>
      <body
        className={
          'font-geist antialiased w-screen h-screen bg-white text-black dark:bg-black dark:text-white'
        }
      >
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
