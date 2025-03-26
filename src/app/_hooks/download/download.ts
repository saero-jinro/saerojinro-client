'use client';
import { wrapApiResponse } from '@/_utils/api/response';
import { useState } from 'react';

// 다운로드 훅
const useDownload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 데이터 get
  const fetchLectureFile = (materialsId: number) => {
    return wrapApiResponse(
      () =>
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/files/download/${materialsId}`, {
          headers: {
            Accept: 'application/octet-stream',
          },
        }),
      async (res) => {
        const blob = await res.blob();
        return blob;
      },
    );
  };

  // 데이터 다운
  const triggerDownload = (blobdata: Blob, speakerName: string) => {
    const filename = `${speakerName}_강의자료.zip`;
    const url = URL.createObjectURL(blobdata);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  /**
   * speakerName: 강연자 이름,
   * materialsId: 파일 아이디
   */
  const downloadLectureFile = async (speakerName: string, materialsId: number) => {
    setLoading(true);
    setError(null);

    try {
      // 파일 blob으로 get
      const res = await fetchLectureFile(materialsId);

      if (!res.ok || !res.data) throw new Error('파일 다운로드 실패');

      const blob = res.data;

      // blob -> 네이밍 -> 다운
      triggerDownload(blob, speakerName);
    } catch (err) {
      console.error(err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  return { downloadLectureFile, loading, error };
};
export default useDownload;
