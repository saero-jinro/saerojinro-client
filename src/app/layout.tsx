import '@/_styles/globals.css';

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body className="font-geist antialiased">{children}</body>
    </html>
  );
};

export default RootLayout;
