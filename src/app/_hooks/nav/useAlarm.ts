import { Alarm, ResponseAlarm } from '@/_types/Header/Alarm.type';
import { wrapApiResponse } from '@/_utils/api/response';
import { useCallback, useEffect, useRef } from 'react';
import { ApiResponse } from '@/_types/Auth/auth.type';
import useAlarmStore from '@/_store/Header/useAlarmStore';
import useAuthStore from '@/_store/auth/useAuth';

const useAlarm = () => {
  /* Constants */
  const POLLING_SEC = 1000 * 7;
  const BACK_URL = process.env.NEXT_PUBLIC_BACKEND_API;
  const URL = {
    fetchUserAlarms: `${BACK_URL}/api/notifications/me`,
  };

  /** Auth Store */
  const accessToken = useAuthStore((store) => store.state.accessToken);
  const setAuth = useAuthStore((store) => store.actions.setAuth);
  const role = useAuthStore((store) => store.state.role);

  /** Alarm Store */
  const isOpen = useAlarmStore((store) => store.isOpen.state.isOpen);
  const isNewMessage = useAlarmStore((store) => store.isNewMessage.state.isNewMessage);
  const loadInitAlarms = useAlarmStore((store) => store.alarms.actions.loadInitAlarms);
  const setNewMessageState = useAlarmStore(
    (store) => store.isNewMessage.actions.setNewMessageState,
  );

  /** Refs */
  const prevAlarmCountRef = useRef(0); // 이전 알림 개수
  const hasInitializedRef = useRef(false); // 초기 로딩 여부

  /** API 요청 */
  const getNotifications = useCallback(() => {
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

  /** 알림 패치 */
  const fetchNotifications = useCallback(async () => {
    if (!accessToken || role !== 'user') return;

    try {
      const res = await getNotifications();

      if (!res.data) throw new Error('데이터가 존재하지 않습니다');

      const data = res.data;
      const len = data.length;
      loadInitAlarms(data.reverse());

      if (!hasInitializedRef.current) {
        hasInitializedRef.current = true; // 최초 실행
        prevAlarmCountRef.current = len; // 알림 수 저장
        if (len !== 0) setNewMessageState(true);
        return;
      }

      // 이전 알림 수와 개수가 같다면 return
      if (prevAlarmCountRef.current === len) return;

      // 상태 업뎃
      prevAlarmCountRef.current = len;

      // 알림 창이 닫힌 상태에서만 새 메시지 상태 초기화
      if (!isOpen) setNewMessageState(true);
    } catch (err) {
      console.error(err);
      setAuth(null, 'guest');
    }
  }, [accessToken, role, isOpen, loadInitAlarms, getNotifications, setNewMessageState, setAuth]);

  /** 알림 창이 열리면 새 메시지 상태 false로 변경 */
  useEffect(() => {
    if (!isOpen) return;
    setNewMessageState(false);
  }, [isOpen, setNewMessageState, isNewMessage]);

  /** 폴링 시작 및 중단 관리 */
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const startPolling = () => {
      fetchNotifications();
      interval = setInterval(() => {
        fetchNotifications();
      }, POLLING_SEC);
    };

    const stopPolling = () => {
      clearInterval(interval);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        startPolling();
      } else {
        stopPolling();
      }
    };

    if (role !== 'user' || !accessToken) {
      stopPolling();
      return;
    }

    startPolling();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopPolling();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [role, POLLING_SEC, fetchNotifications, accessToken]);

  //#endregion
};
export default useAlarm;
