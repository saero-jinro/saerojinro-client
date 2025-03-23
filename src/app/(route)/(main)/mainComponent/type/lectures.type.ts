export type LecturesItem = {
  id: number;
  thumbnailUri: string;
  startTime: string;
  endTime: string;
  title: string;
  location: string;
  speakerName: string;
  category: string;
};

export type Lectures = LecturesItem[];

export type ResponseLectures = {
  lectures: Lectures;
  totalCount: number;
};
