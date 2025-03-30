import LectureList from '../component/list';
import { redirect } from 'next/navigation';

const Page = async ({ searchParams }: { searchParams: Promise<{ day?: string }> }) => {
  const LIMITDAY = 3;
  const { day } = await searchParams;

  if (!day) {
    redirect('/lecture-list/test?day=Day1');
  }

  const isValid = /^Day\d+$/.test(day);
  const dayNum = Number(day.replace('Day', ''));

  if (!isValid || dayNum < 1 || dayNum > LIMITDAY) redirect('/');

  return <LectureList day={day} />;
};

export default Page;
