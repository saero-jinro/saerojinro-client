'use client';

import { Map, MapMarker } from 'react-kakao-maps-sdk';
import Script from 'next/script';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// 빌드시 가끔 1초에 5번 이상 호출되어 가끔 API 락걸림
// 때문에 사진으로 대체
const KakaoMap = () => {
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false`;
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [allowScrollZoom, setAllowScrollZoom] = useState(false);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const hoverRef = useRef(false);

  const handleMapRef = useCallback((map: kakao.maps.Map | null) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (hoverRef.current && e.key === 'Shift') {
        setAllowScrollZoom(true);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Shift') {
        setAllowScrollZoom(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setZoomable(allowScrollZoom);
    }
  }, [allowScrollZoom]);

  return (
    <div
      className="w-full h-full overflow-hidden relative"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => {
        hoverRef.current = false;
        setAllowScrollZoom(false);
      }}
    >
      <LoadingMapImg />
      <Script
        src={KAKAO_SDK_URL}
        strategy="beforeInteractive"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
      {isLoaded || hasError ? (
        <LoadingMapImg />
      ) : (
        <>
          <Map
            ref={handleMapRef}
            scrollwheel={allowScrollZoom}
            center={{ lat: 37.512490246241974, lng: 127.05871460113347 }}
            style={{ width: '100%', height: '100%' }}
          >
            <MapMarker position={{ lat: 37.512490246241974, lng: 127.05871460113347 }} />
          </Map>
          <div className="absolute top-0 left-0 h-6 bg-[#ffffffc0] text-gray-800 bottom-4 z-10 px-3 py-1 text-sm">
            확대: Shift + Wheel
          </div>
        </>
      )}
    </div>
  );
};

export default KakaoMap;

export const LoadingMapImg = () => (
  <div className="absolute w-[942px] h-[280px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    <Image
      alt="지도 이미지"
      width={942}
      height={280}
      src="/main/map.webp"
      className="object-contain"
    />
  </div>
);
