import { useCallback, useEffect } from 'react';
import { Alarm, ResponseAlarm } from '@/_types/Header/Alarm.type';
import useAlarmStore from '@/_store/Header/useAlarmStore';
import { wrapApiResponse } from '@/_utils/api/response';
import { ApiResponse } from '@/_types/Auth/auth.type';
import useAuthStore from '@/_store/auth/useAuth';

const useAlarm = () => {
  const loadInitAlarms = useAlarmStore((store) => store.alarms.actions.loadInitAlarms);
  const isOpen = useAlarmStore((store) => store.isOpen.state.isOpen);
  const accessToken = useAuthStore((store) => store.state.accessToken);
  const role = useAuthStore((store) => store.state.role);

  // 이벤트 스트림을 담기위함
  // const [isInitialLoaded, setIsInitialLoaded] = useState(false); // 초기 데이터 상태 업뎃
  // const eventRef = useRef<EventSource | null>(null);

  const BACK_URL = process.env.NEXT_PUBLIC_BACKEND_API;
  const URL = {
    subscribeToAlarms: BACK_URL + '/api/notifications/subscribe',
    fetchUserAlarms: BACK_URL + '/api/notifications/me',
  };

  const updateAlarm = useCallback(() => {
    if (role !== 'user' || !accessToken) {
      return Promise.resolve({ ok: false, error: '토큰 없음' } as ApiResponse<Alarm[]>);
    }

    return wrapApiResponse(
      () =>
        fetch(`${URL.fetchUserAlarms}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      (res) => res.json().then((dto: ResponseAlarm) => dto.contents),
    );
  }, [role, accessToken, URL.fetchUserAlarms]);

  // 알림창을 열면 데이터 업데이트
  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      try {
        const res = await updateAlarm();

        if (!res.data) throw new Error();

        loadInitAlarms(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [isOpen, updateAlarm, loadInitAlarms]);

  // useEffect(() => {
  //   if (!accessToken || role !== 'guest') return;

  //   const eventSource = new EventSourcePolyfill(`${URL.subscribeToAlarms}`, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });

  //   eventSource.onopen = () => {
  //     console.log('SSE 연결 성공');
  //   };
  //   eventSource.onerror = (e: MessageEvent) => {
  //     console.error('SSE 연결 오류 발생!', e);
  //   };

  //   eventSource.onmessage = (e: MessageEvent) => {
  //     console.log('서버에서 온 메시지:', e.data);
  //     // 여기서 JSON.parse(event.data) 해서 처리해도 됨
  //   };

  //   eventSource.onerror = (e: MessageEvent) => {
  //     console.error('SSE 에러:', e);
  //     // 연결 에러 시 재연결 처리를 여기에 넣을 수도 있음
  //   };

  //   return () => {
  //     console.log('SSE 연결 해제');
  //     eventSource.close();
  //   };
  // }, [accessToken, role]);
};
export default useAlarm;
