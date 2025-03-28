export interface TimeRange {
  startTime: string;
  endTime: string;
}

export const hasTimeConflict = (target: TimeRange, existing: TimeRange[]): boolean => {
  const targetStart = new Date(target.startTime).getTime();
  const targetEnd = new Date(target.endTime).getTime();

  return existing.some((lec) => {
    const start = new Date(lec.startTime).getTime();
    const end = new Date(lec.endTime).getTime();

    return start < targetEnd && end > targetStart;
  });
};
