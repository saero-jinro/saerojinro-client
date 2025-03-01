import '@/_styles/globals.css';
import { cookies } from 'next/headers';
import Header from './_components/Header/Header.test';

const RootLayout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value ?? '';
  const default_style = 'font-geist antialiased w-screen h-screen';
  const light_style = 'dark:bg-black dark:bg-fdfdfd';
  const dark_style = 'bg-white color-black';
  return (
    <html lang="en" className={theme}>
      <body className={`${default_style} ${light_style} ${dark_style}`}>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
