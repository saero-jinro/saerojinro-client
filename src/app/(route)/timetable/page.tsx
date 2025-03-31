import TimetablePage from './timetableComponent/timetablePage';
import { redirect } from 'next/navigation';

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ day?: string; showWishlist: string }>;
}) => {
  const LIMITDAY = 3; // 컨퍼런스 진행일
  const { day, showWishlist } = await searchParams;

  if (!day || (showWishlist !== 'true' && showWishlist !== 'false'))
    redirect(`/timetable?day=Day1&showWishlist=false`);

  const isValidDay = /^Day\d+$/.test(day);
  const dayNum = Number(day.replace('Day', ''));
  const initShowWishlist = showWishlist === 'true';

  if (!isValidDay || dayNum < 1 || dayNum > LIMITDAY) redirect('/');

  return <TimetablePage initDay={day} initShowWishlist={initShowWishlist} />;
};

export default Page;
