'use client';

import useAuthStore from '@/_store/auth/useAuth';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useRef } from 'react';

const Page = () => {
  const accessToken = useAuthStore((store) => store.state.accessToken);

  const eventSourceRef = useRef(null);

  const SubScribe = () => {
    if (!accessToken) {
      console.log('액세스 토큰 없음');
      return;
    }

    if (eventSourceRef.current) {
      console.log('이미 연결됨');
      return;
    }

    const eventSource = new EventSourcePolyfill(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/notifications/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    eventSource.onopen = () => {
      console.log('SSE 연결 성공');
    };

    eventSource.onerror = (e: MessageEvent) => {
      console.error('SSE 연결 오류 발생!', e);
      eventSource.close();
      eventSourceRef.current = null;
    };

    eventSource.onmessage = (e: MessageEvent) => {
      try {
        const parsed = JSON.parse(e.data);
        console.log('수신된 메시지 (파싱됨):', parsed);
      } catch {
        console.log('수신된 메시지 (원본):', e.data);
      }
    };
    eventSourceRef.current = eventSource;
  };

  return (
    <div className="w-screen h-screen">
      <button onClick={SubScribe}>테스트 버튼</button>
    </div>
  );
};
export default Page;
