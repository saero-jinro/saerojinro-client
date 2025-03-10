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
