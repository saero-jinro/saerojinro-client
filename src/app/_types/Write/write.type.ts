export enum Category {
  BACKEND = 'BACKEND',
  FRONTEND = 'FRONTEND',
  DEVOPS = 'DEVOPS',
  MOBILE = 'MOBILE',
}

export interface LectureFormData {
  title: string;
  contents: string;
  thumbnail: number | null;
  materialId: number | null;
  maxCapacity: number;
  start_time: string;
  end_time: string;
  location: string;
  category: Category;
  speakerName: string;
  speakerEmail: string;
  speakerPosition: string;
  speakerIntroduction: string;
  speakerFilmography: string;
  speakerPhotoId: number | null;
}

export type SendLectureFormData = LectureFormData;

export type InputLectureFormData = Omit<LectureFormData, 'speakerFilmography'> & {
  speakerFilmography: string[];
};
