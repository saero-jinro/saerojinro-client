'use client';

import Script from 'next/script';

const KaKaoScript = () => {
  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.js"
      strategy="afterInteractive"
      onLoad={() => {
        console.log('✅ Kakao SDK 로드 완료');

        if (window.Kakao && !window.Kakao.isInitialized()) {
          const apiKey = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
          if (apiKey) {
            window.Kakao.init(apiKey);
            console.log('Kakao SDK 초기화 완료');
          } else {
            console.error('Kakao API Key가 없습니다.');
          }
        }
      }}
    />
  );
};

export default KaKaoScript;
