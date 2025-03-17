import { LectureListProps } from '@/_store/LectureList/useLectureStore';

export const groupByDay = (lectures: LectureListProps[]) => {
  const grouped: Record<string, LectureListProps[]> = {};

  const sortedLectures = [...lectures].sort(
    (a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime(),
  );

  const uniqueDays = Array.from(
    new Set(sortedLectures.map((lecture) => new Date(lecture.start_time).toDateString())),
  );

  uniqueDays.forEach((day, index) => {
    grouped[`Day${index + 1}`] = sortedLectures.filter(
      (lecture) => new Date(lecture.start_time).toDateString() === day,
    );
  });

  return grouped;
};

export const groupByTime = (lectures: LectureListProps[]) => {
  return lectures.reduce(
    (acc, lecture) => {
      const timeStart = new Date(lecture.start_time).getHours().toString().padStart(2, '0') + ':00';

      if (!acc[timeStart]) acc[timeStart] = [];
      acc[timeStart].push(lecture);
      return acc;
    },
    {} as Record<string, LectureListProps[]>,
  );
};
