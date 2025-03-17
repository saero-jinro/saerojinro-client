'use client';

// import { Map, MapMarker } from 'react-kakao-maps-sdk';
// import Script from 'next/script';
// import { useState } from 'react';
import Image from 'next/image';

// 빌드시 가끔 1초에 5번 이상 호출되어 가끔 API 락걸림
// 때문에 사진으로 대체
const KakaoMap = () => {
  // const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false`;
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [hasError, setHasError] = useState(false);

  return (
    <div className="w-full h-full">
      {/* <Script
        src={KAKAO_SDK_URL}
        strategy="beforeInteractive"
        // onLoad={() => setIsLoaded(true)}
        // onError={() => setHasError(true)}
      /> */}

      {/* {isLoaded || hasError ? ( */}
      <LoadingMapImg />
      {/* ) : (
        <Map
          center={{ lat: 37.512490246241974, lng: 127.05871460113347 }}
          style={{ width: '100%', height: '100%' }}
        >
          <MapMarker position={{ lat: 37.512490246241974, lng: 127.05871460113347 }} />
        </Map>
      )} */}
    </div>
  );
};

export default KakaoMap;

const LoadingMapImg = () => {
  return (
    <div className="overflow-hidden">
      <Image alt="지도 이미지" width={716} height={498} src="/main/map.webp" />
    </div>
  );
};
