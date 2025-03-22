import { useCallback, useEffect } from 'react';
import { Alarm, ResponseAlarm } from '@/_types/Header/Alarm.type';
import useAlarmStore from '@/_store/Header/useAlarmStore';
import { wrapApiResponse } from '@/_utils/api/response';
import { ApiResponse } from '@/_types/Auth/auth.type';
import useAuthStore from '@/_store/auth/useAuth';
// import { EventSourcePolyfill } from 'event-source-polyfill';

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
      const res = await updateAlarm();

      if (!res.ok) {
        if (res.error) console.error(res.error);
        return;
      }

      if (!res.data) {
        console.error('데이터 타입 불일치');
        return;
      }

      loadInitAlarms(res.data);
    })();
  }, [isOpen, updateAlarm, loadInitAlarms]);
};
export default useAlarm;
