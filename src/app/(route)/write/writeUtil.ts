import { SendLectureFormData } from '@/_types/Write/write.type';

// 이미지 아이디 추출 (썸네일)
export const uploadImgAndGetId = async (uri: string, name: 'thumbnail' | 'speakerPhotoId') => {
  const url = {
    speakerPhotoId: 'files/lecture/thumbnail',
    thumbnail: 'files/speaker',
  };

  const URL = url[name];

  try {
    const res = await fetch(`api/${URL}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uri }),
    });

    if (res.ok) {
      const dto = (await res.json()) as { id: number };

      if (dto.id) {
        return dto.id;
      }
      throw new Error();
    }
  } catch (error) {
    console.error('Error fetching DTO:', error);
  }
};

// 파일 추출
export const uploadFileAndGetId = async (file: File) => {
  const URL = 'files/lecture/resource';

  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await fetch(`api/${URL}`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (res.ok) {
      const dto = (await res.json()) as { id: number };

      if (dto.id) {
        return dto.id;
      }
      throw new Error();
    }
  } catch (error) {
    console.error('Error fetching DTO:', error);
  }
};

// 강의 생성
export const submitLecture = async (dto: SendLectureFormData) => {
  const URL = 'lectures';
  try {
    const res = await fetch(`api/${URL}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dto),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || '강의 생성 실패');
    }
    return true;
  } catch (error) {
    console.error('강의 생성 오류:', error);
    return false;
  }
};
