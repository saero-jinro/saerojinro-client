'use client';
import { ApiResponse } from '@/_types/Auth/auth.type';
import { InputLectureFormData } from '@/_types/Write/write.type';

const useUpload = () => {
  const BACK_URL = process.env.NEXT_PUBLIC_BACKEND_ADMIN_API;
  const path = {
    thumbnail: BACK_URL + '/api/files/lecture/thumbnail',
    profile: BACK_URL + '/api/files/lecture/thumbnail',
    file: BACK_URL + '/api/files/lecture/materials',
    submit: BACK_URL + '/api/lectures',
  };

  const getImageUID = async (
    uri: string,
    type: 'thumbnail' | 'profile',
  ): Promise<ApiResponse<number>> => {
    try {
      const res = await fetch(`${path[type]}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uri,
        }),
      });

      if (!res.ok) throw new Error('응답 에러');

      const data = (await res.json()) as { id: number };

      if (typeof data.id !== 'number') throw new Error('타입 에러');

      return {
        ok: true,
        data: data.id,
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('getImageUID error:', message);
      return {
        ok: false,
        error: `서버 오류 발생: ${message}`,
      };
    }
  };

  const getFileUID = async (file: File): Promise<ApiResponse<number>> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${path.file}`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('응답 에러');

      const data = (await res.json()) as { id: number };

      if (typeof data.id !== 'number') throw new Error('타입 에러');

      return {
        ok: true,
        data: data.id,
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('getImageUID error:', message);
      return {
        ok: false,
        error: `서버 오류 발생: ${message}`,
      };
    }
  };

  const submitLecture = async (dto: InputLectureFormData) => {
    if (!dto.materialId) {
      alert('파일이 비어있어요!');
      return;
    }

    const speakerFilmography = JSON.stringify(dto.speakerFilmography);
    let speakerPhotoId;
    let thumbnailId;
    let materialId;

    try {
      const res1 = await getImageUID(dto.thumbnailId, 'thumbnail');

      if (!res1.ok || !res1.data) throw new Error('썸네일 추출 에러');

      thumbnailId = res1.data;

      const res2 = await getImageUID(dto.speakerPhotoId, 'profile');

      if (!res2.ok || !res2.data) throw new Error('프로필 이미지 추출 에러');

      speakerPhotoId = res2.data;

      const res3 = await getFileUID(dto.materialId);

      if (!res3.ok || !res3.data) throw new Error('파일 추출 에러');

      materialId = res3.data;

      const totalDto = { ...dto, speakerFilmography, speakerPhotoId, thumbnailId, materialId };

      const res = await fetch(`${path.submit}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(totalDto),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`강의 생성 에러: ${res.status} / ${errorText}`);
      }

      alert('강의 생성이 완료되었습니다.');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('서버 응답 오류:', message);
      alert(`강의 생성 실패: ${message}`);
    }
  };

  return { getImageUID, getFileUID, submitLecture };
};

export default useUpload;
