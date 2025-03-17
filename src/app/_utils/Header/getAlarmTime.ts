const SEC_MINUTE = 60;
const SEC_HOUR = 60 * SEC_MINUTE;
const SEC_DAY = 24 * SEC_HOUR;

export const getAlarmTime = (time: string) => {
  const alarmTime = new Date(time);
  const curTime = new Date();

  const diffSec = Math.round((curTime.getTime() - alarmTime.getTime()) / 1000);

  if (diffSec < SEC_MINUTE) return `${diffSec}초 전`;
  if (diffSec < SEC_HOUR) return `${Math.floor(diffSec / 60)}분 전`;
  if (diffSec < SEC_DAY) return `${Math.floor(diffSec / (60 * 60))}시간 전`;

  return `${Math.floor(diffSec / (60 * 60 * 24))}일 전`;
};
