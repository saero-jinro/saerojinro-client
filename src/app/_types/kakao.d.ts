// src/types/kakao.d.ts
export {};

declare global {
  type KakaoLatLng = {
    new (lat: number, lng: number): KakaoLatLng;
  };

  type KakaoMapOptions = {
    center: KakaoLatLng;
    level: number;
  };

  type KakaoMap = {
    new (container: HTMLElement, options: KakaoMapOptions): KakaoMap;
    setCenter: (latLng: KakaoLatLng) => void;
    setLevel: (level: number) => void;
  };

  type KakaoMarker = {
    new (options: { position: KakaoLatLng }): KakaoMarker;
    setMap: (map: KakaoMap | null) => void;
  };

  type KakaoMaps = {
    LatLng: KakaoLatLng;
    Map: KakaoMap;
    Marker: KakaoMarker;
  };

  type KakaoNamespace = {
    maps: KakaoMaps;
  };

  interface Window {
    kakao: KakaoNamespace;
  }
}
