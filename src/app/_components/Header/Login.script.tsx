'use client';
import Script from 'next/script';

// 카카오 SDK 스크립트 클라이언트에서만 실행 가능하기에 분리함.
const KaKaoScript = () => {
  return (
    <Script
      src="https://developers.kakao.com/sdk/js/kakao.js"
      strategy="afterInteractive"
      onLoad={() => {
        console.log('Kakao SDK 로드 완료');

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
