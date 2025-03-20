interface BaseLectureProps {
  title: string;
  startTime: string;
  endTime: string;
  speakerName: string;
  location: string;
  category: string;
}

export interface RecommandLectureProps extends BaseLectureProps {
  id: number;
  speakerImageUri: string;
}

export interface TimeWishProps extends BaseLectureProps {
  lectureId: number;
  thumbnailUri: string;
  contents: string;
}

interface TableBaseLectureProps {
  userId: number;
  lectureId: number;
  title: string;
  startTime: string;
  endTime: string;
  currentReservation: number;
  capacity: number;
  location: string;
  speakerName: string;
}

export interface LectureProps extends TableBaseLectureProps {
  reservationId: number;
  day?: number;
}

export interface WishLectureProps extends TableBaseLectureProps {
  wishlistId: number;
}
