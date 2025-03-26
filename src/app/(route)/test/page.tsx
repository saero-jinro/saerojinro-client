'use client';
import useDownload from '@/_hooks/download/download';

const Page = () => {
  const { downloadLectureFile } = useDownload();
  return (
    <>
      <button onClick={() => downloadLectureFile('강연자', 1)}>download</button>
    </>
  );
};

export default Page;
