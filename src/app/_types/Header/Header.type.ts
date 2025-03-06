export type Theme = 'light' | 'dark';

// 추후 권한에 따라 속성 수정 필요
export type UserRole = 'viewer' | 'editor' | 'admin';

export type LinkInfo = {
  title: string;
  link: string;
  desc: string;
};
