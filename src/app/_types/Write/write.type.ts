export enum Category {
  BACKEND = 'BACKEND',
  FRONTEND = 'FRONTEND',
  AI = 'AI',
  DATA = 'DATA',
  CLOUD = 'CLOUD',
  DEVOPS = 'DEVOPS',
  UX_UI = 'UX_UI',
  SEC = 'SEC',
  PM = 'PM',
  BLOCKCHAIN = 'BLOCKCHAIN',
  MOBILE = 'MOBILE',
}

export interface LectureFormData {
  title: string;
  contents: string;
  thumbnailId: number;
  materialId: number;
  maxCapacity: number;
  startTime: string;
  endTime: string;
  location: string;
  category: Category;
  speakerName: string;
  speakerEmail: string;
  speakerPosition: string;
  speakerIntroduction: string;
  speakerFilmography: string;
  speakerPhotoId: number;
}

export type SendLectureFormData = LectureFormData;

export type InputLectureFormData = Omit<
  LectureFormData,
  'speakerFilmography' | 'speakerPhotoId' | 'thumbnailId' | 'materialId'
> & {
  speakerFilmography: string[];
  speakerPhotoId: string;
  thumbnailId: string;
  materialId: File | null;
};
