'use client';

import useHeaderStore from '@/_store/Header/useHeaderStore';
import { wrapApiResponse } from '@/_utils/api/response';
import { ApiResponse } from '@/_types/Auth/auth.type';
import ClickButton from '@/_components/ClickButton';
import useAuthStore from '@/_store/auth/useAuth';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const updateUserInfo = async (
  name: string,
  email: string,
  accessToken: string,
): Promise<ApiResponse<null>> => {
  const BACK_URL = process.env.NEXT_PUBLIC_BACKEND_API;
  const URL = `${BACK_URL}/api/users`;
  console.log('asdasd');
  return wrapApiResponse(
    () =>
      fetch(URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name, email }),
      }),
    () => Promise.resolve(null),
  );
};

type EditableFieldProps = {
  id: string;
  label: string;
  value: string;
  onSave: (value: string) => Promise<boolean>;
};

export const EditableField = ({ id, label, value, onSave }: EditableFieldProps) => {
  const showPopup = useHeaderStore((store) => store.popup.actions.showPopup);
  const [state, setState] = useState(value);

  const onOpen = () =>
    showPopup({
      contents: `${label}을(를) 변경하시겠습니까?`,
      func: () => {
        handleUpdate();
      },
    });

  useEffect(() => {
    setState(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };

  const handleUpdate = async () => {
    if (!state.trim()) {
      alert(`${label}을(를) 입력해주세요.`);
      return;
    }
    try {
      const ok = await onSave(state);
      if (!ok) setState(value);
    } catch {
      alert(`연결 에러`);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className="font-semibold h-full flex items-center">
        {label}
      </label>
      <div className="w-full flex gap-2">
        <input
          aria-label={`${id}-change`}
          id={id}
          value={state}
          onChange={handleChange}
          placeholder={`${label}을 입력하세요`}
          className="h-12 w-full px-4 bg-[#F1F5F9] dark:bg-[#0D121E] rounded-xs focus-within:outline outline-[#015AFF] focus-within:bg-white dark:focus-within:outline-[#003AA5] dark:focus-within:bg-[#070A12]"
        />
        <ClickButton
          actionDesc={`${id}-change`}
          onClick={onOpen}
          className="btn h-12 px-4 py-1 font-semibold whitespace-nowrap rounded-[2px]"
        >
          변경
        </ClickButton>
      </div>
      {/* <Popup /> */}
    </div>
  );
};

// 프로필 이메일
export const MyProfileEmail = () => {
  const accessToken = useAuthStore((store) => store.state.accessToken);
  const updateUserInfoData = useAuthStore((store) => store.actions.updateUserInfo);
  const name = useAuthStore((store) => store.state.name);
  const email = useAuthStore((store) => store.state.email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <EditableField
      id="email"
      label="이메일"
      value={email ?? ''}
      onSave={async (next) => {
        if (!emailRegex.test(next)) {
          alert('유효한 이메일 형식을 입력해주세요.');
          return false;
        }
        try {
          if (!name) throw new Error('이름을 입력하세요');
          if (!accessToken) throw new Error('액세스 토큰이 존재하지 않습니다');
          const res = await updateUserInfo(name, next, accessToken);

          if (res.ok) {
            alert('이메일이 변경되었습니다!');
            updateUserInfoData({ email: next });
            return true;
          }

          alert(res.error || '이메일 변경에 실패했습니다.');
          return false;
        } catch (e) {
          console.error('업데이트 요청 실패:', e);
          alert('요청 중 문제가 발생했습니다.');
          return false;
        }
      }}
    />
  );
};

// 프로필 이름
export const MyProfileName = () => {
  const accessToken = useAuthStore((store) => store.state.accessToken);
  const updateUserInfoData = useAuthStore((store) => store.actions.updateUserInfo);
  const name = useAuthStore((store) => store.state.name);
  const email = useAuthStore((store) => store.state.email);
  const isKorean = /^[가-힣]+$/;
  const isEnglish = /^[a-zA-Z]+$/;
  const hasInvalidChar = /[^a-zA-Z가-힣]/;

  return (
    <EditableField
      id="name"
      label="이름"
      value={name ?? ''}
      onSave={async (next) => {
        if (!next.trim()) {
          alert('이름을 입력해주세요.');
          return false;
        }

        if (hasInvalidChar.test(next)) {
          alert('이름에는 특수문자나 숫자를 사용할 수 없습니다.');
          return false;
        }

        if (!(isKorean.test(next) || isEnglish.test(next))) {
          alert('이름은 한글 또는 영어만 사용할 수 있습니다. (혼용 불가)');
          return false;
        }

        if (!email || !accessToken) return false;

        const res = await updateUserInfo(next, email, accessToken);
        if (res.ok) {
          alert('이름이 변경되었습니다!');
          updateUserInfoData({ name: next });
          return true;
        }

        alert(res.error || '이름 변경에 실패했습니다.');
        return false;
      }}
    />
  );
};

// 프로필 이미지
export const MyProileImage = () => {
  const picture = useAuthStore((store) => store.state.pictrue);
  const getLink = () => {
    if (!picture) return '/main/user.webp';
    return picture;
  };
  return (
    <div>
      <div
        className="w-[160px] md:w-[180px] aspect-square md:mr-auto mx-auto overflow-hidden bg-black rounded-[8px]"
        aria-label="이미지 대체"
      >
        <Image height={180} width={180} alt="askjdl" src={getLink()} />
      </div>
    </div>
  );
};
