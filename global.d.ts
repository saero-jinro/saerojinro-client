interface KakaoAuth {
  authorize(params: { redirectUri: string; scope?: string }): void;
  getAccessToken(): string | null;
}

interface KakaoAPI {
  request(params: { url: string; success: (res: any) => void; fail: (error: any) => void }): void;
}

interface KakaoSDK {
  init(apiKey: string): void;
  isInitialized(): boolean;
  Auth: KakaoAuth;
  API: KakaoAPI;
}

declare global {
  interface Window {
    Kakao: KakaoSDK;
  }
}

export {};

declare global {
  interface Window {
    kakao: any;
  }
}

// ----------------- MAP ----------------- //
interface KakaoMaps {
  LatLng: new (lat: number, lng: number) => any;
  Map: new (container: HTMLElement, options: { center: any; level: number }) => any;
  Marker: new (options: { position: any }) => any;
}

interface KakaoNamespace {
  maps: KakaoMaps;
}

interface Window {
  kakao: KakaoNamespace;
}
