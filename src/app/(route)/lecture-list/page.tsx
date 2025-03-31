import LectureList from './component/list';
import { redirect } from 'next/navigation';

const allowedCategories = [
  'ALL',
  'BACKEND',
  'FRONTEND',
  'AI',
  'DATA',
  'CLOUD',
  'DEVOPS',
  'UX_UI',
  'SEC',
  'PM',
  'BLOCKCHAIN',
  'MOBILE',
];

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{ day?: string; category?: string }>;
}) => {
  const LIMITDAY = 3; // 컨퍼런스 진행일
  const { day, category } = await searchParams;

  // 날짜 유효성 체크
  if (!day) {
    redirect(`/lecture-list/?day=Day1&category=ALL`);
  }

  const isValidDay = /^Day\d+$/.test(day);
  const dayNum = Number(day.replace('Day', ''));

  // 날짜가 해당하는 날짜인지 확인
  if (!isValidDay || dayNum < 1 || dayNum > LIMITDAY) {
    redirect('/');
  }

  const categories = category?.split(',') ?? ['ALL'];
  const isValidCategories = categories.every((c) => allowedCategories.includes(c));

  // 카테고리 유효성 체크
  if (!isValidCategories) {
    redirect(`/lecture-list/?day=${day}&category=ALL`);
  }

  return <LectureList initDay={day} initCategories={categories} />;
};

export default Page;
