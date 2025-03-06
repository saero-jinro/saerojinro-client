import { LinkInfo, UserRole } from '@/_types/Header/Header.type';
type UserRoleLinks = Record<UserRole, LinkInfo[]>;

// 어드민 페이지는 닉네임 클릭하면 어드민 페이지로 리다이렉트

const timeline = { title: '시간표', link: '/timeline', desc: '시간표 페이지로 이동' };
const myPage = { title: '나의 정보', link: '/myPage', desc: '나의 정보 페이지로 이동' };

const lectureList = {
  title: '강의 목록',
  link: '/leture-list',
  desc: '강의 리스트 페이지로 이동',
};

const myLectureList = {
  title: '나의 강의',
  link: '#',
  desc: '나의 강의 리스트 페이지로 이동',
};

const createLecture = {
  title: '강의 등록',
  link: '#',
  desc: '강의 등록 페이지로 이동',
};

const userLinks: UserRoleLinks = {
  viewer: [lectureList, timeline],
  editor: [lectureList],
  admin: [lectureList],
};

const userLinksMobile: UserRoleLinks = {
  viewer: [myPage, lectureList, timeline],
  editor: [myPage, lectureList, myLectureList, createLecture],
  admin: [lectureList],
};

export const getUserLinks = (role: UserRole) => userLinks[role];
export const getUserLinksMobile = (role: UserRole) => userLinksMobile[role];
