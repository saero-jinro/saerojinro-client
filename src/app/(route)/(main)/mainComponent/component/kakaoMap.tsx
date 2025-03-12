'use client';

import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Script from 'next/script';

const KakaoMap = () => {
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false`;

  return (
    <div className="w-full h-full">
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map
        center={{ lat: 37.512490246241974, lng: 127.05871460113347 }}
        style={{ width: '500px', height: '100%' }}
      >
        <MapMarker position={{ lat: 37.512490246241974, lng: 127.05871460113347 }} />
      </Map>
    </div>
  );
};

export default KakaoMap;
