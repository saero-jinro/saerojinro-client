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

export const temporaryLectures = [
  {
    id: 0,
    thumbnailUri: '',
    startTime: '',
    endTime: '',
    title: '',
    location: '',
    speakerName: '',
    category: '',
  },
  {
    id: 1,
    thumbnailUri: '',
    startTime: '',
    endTime: '',
    title: '',
    location: '',
    speakerName: '',
    category: '',
  },
  {
    id: 2,
    thumbnailUri: '',
    startTime: '',
    endTime: '',
    title: '',
    location: '',
    speakerName: '',
    category: '',
  },
] as Lectures;
