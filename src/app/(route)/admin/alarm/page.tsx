'use client';

import useAuthStore from '@/_store/auth/useAuth';
import { useEffect, useState } from 'react';
import '../../../_styles/admin.css';

interface Lecture {
  id: number;
  title: string;
}

const NotificationPage = () => {
  const [category, setCategory] = useState('');
  const [lecture, setLecture] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [placeholder, setPlaceholder] = useState('내용을 입력하세요');
  const [lectureList, setLectureList] = useState<Lecture[]>([]);

  const isInit = category === '';
  const isEmergency = category === '긴급 공지';
  const isEdit = category === '강의 변경';
  const isCancel = category === '강의 취소';

  const accessToken = useAuthStore((store) => store.state.accessToken);
  const role = useAuthStore((store) => store.state.role);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const res = await fetch('https://admin.saerojinro.site/api/lectures', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`서버 응답 실패 (status: ${res.status})`);
        }

        const data = await res.json();

        if (Array.isArray(data.lectures)) {
          setLectureList(data.lectures);
        } else {
          console.error('lectures 필드가 배열이 아닙니다:', data);
          setLectureList([]);
        }
      } catch (error) {
        console.error('강의 목록 불러오기 실패:', error);
        setLectureList([]);
      }
    };

    if (role === 'admin' && accessToken) {
      fetchLectures();
    }
  }, [accessToken, role]);

  const handleSendNotification = async () => {
    try {
      if (isEmergency) {
        const res = await fetch('https://admin.saerojinro.site/api/notifications/all', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: '긴급 공지',
            contents: message,
          }),
        });

        if (!res.ok) {
          throw new Error('알림 전송 실패');
        }

        alert('긴급 공지가 성공적으로 전송되었습니다!');
      } else if (isEdit || isCancel) {
        const selectedLecture = lectureList.find((lec) => lec.title === lecture);

        if (!selectedLecture) {
          alert('선택한 강의 정보를 찾을 수 없습니다.');
          return;
        }

        const lectureId = selectedLecture.id;
        const contents = `
[카테고리] ${category}
[변경 날짜] ${date || '미지정'}
[변경 시간] ${time || '미지정'}
[변경 장소] ${room || '미지정'}
[비고] ${message || '없음'}
        `.trim();

        const res = await fetch(
          `https://admin.saerojinro.site/api/notifications/lectures/${lectureId}`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: lecture,
              contents,
            }),
          },
        );

        if (!res.ok) {
          throw new Error('알림 전송 실패');
        }

        alert(`${category} 알림이 성공적으로 전송되었습니다!`);
      } else {
        alert('카테고리를 선택해주세요.');
      }
    } catch (error) {
      console.error('알림 전송 중 오류:', error);
      alert('알림 전송 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex flex-col items-center p-8 min-h-screen">
      <div className="w-full max-w-[1122px] mx-auto pt-[64px] pb-[360px]">
        <h1 className="text-2xl font-bold mb-6">알림 관리</h1>

        <div className="bg-white shadow overflow-hidden w-[1122px] h-[480px]">
          {[
            {
              label: '카테고리',
              element: (
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-[383px] h-[38px] border rounded-md"
                >
                  <option disabled value="" className="text-gray-400">
                    카테고리를 선택하세요
                  </option>
                  <option>긴급 공지</option>
                  <option>강의 변경</option>
                  <option>강의 취소</option>
                </select>
              ),
            },
            {
              label: '강의명',
              element: (
                <select
                  value={lecture}
                  onChange={(e) => setLecture(e.target.value)}
                  disabled={!isInit && isEmergency}
                  className={`w-[383px] h-[38px] border p-2 rounded-md ${
                    !isInit && isEmergency ? 'bg-gray-100 text-gray-400' : ''
                  }`}
                >
                  <option disabled value="" className="text-gray-400">
                    강의를 선택하세요
                  </option>
                  {lectureList.map((lec) => (
                    <option key={lec.id} value={lec.title} className="whitespace-nowrap">
                      {lec.title}
                    </option>
                  ))}
                </select>
              ),
            },
            {
              label: '변경 날짜',
              element: (
                <select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  disabled={!isInit && !isEdit}
                  className={`w-[383px] h-[38px] border p-2 rounded-md ${
                    !isInit && !isEdit ? 'bg-gray-100 text-gray-400' : ''
                  }`}
                >
                  <option disabled value="" className="text-gray-400">
                    날짜를 선택하세요
                  </option>
                  <option value="03월 06일">03월 06일</option>
                  <option value="03월 07일">03월 07일</option>
                  <option value="03월 08일">03월 08일</option>
                </select>
              ),
            },
            {
              label: '변경 시간',
              element: (
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  disabled={!isInit && !isEdit}
                  className={`w-[383px] h-[38px] border p-2 rounded-md ${
                    !isInit && !isEdit ? 'bg-gray-100 text-gray-400' : ''
                  }`}
                >
                  <option disabled value="" className="text-gray-400">
                    시간을 선택하세요
                  </option>
                  <option>9시</option>
                  <option>10시</option>
                  <option>11시</option>
                  <option>13시</option>
                  <option>14시</option>
                  <option>15시</option>
                  <option>16시</option>
                  <option>17시</option>
                </select>
              ),
            },
            {
              label: '변경 장소',
              element: (
                <select
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  disabled={!isInit && !isEdit}
                  className={`w-[383px] h-[38px] border p-2 rounded-md ${
                    !isInit && !isEdit ? 'bg-gray-100 text-gray-400' : ''
                  }`}
                >
                  <option disabled value="" className="text-gray-400">
                    장소를 선택하세요
                  </option>
                  <option>Room-A1</option>
                  <option>Room-B2</option>
                  <option>Room-C3</option>
                </select>
              ),
            },
            {
              label: '내용',
              element: (
                <input
                  type="text"
                  placeholder={placeholder}
                  value={message}
                  disabled={!isInit && !isEmergency}
                  onFocus={() => (isInit || isEmergency) && setPlaceholder('')}
                  onBlur={() =>
                    (isInit || isEmergency) &&
                    setPlaceholder(message === '' ? '내용을 입력하세요' : '')
                  }
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-[383px] h-[48px] border p-2 rounded-md ${
                    !isInit && !isEmergency ? 'bg-gray-100 text-gray-400' : ''
                  }`}
                />
              ),
            },
          ].map(({ label, element }, idx) => (
            <div key={idx} className="grid grid-cols-[150px_1fr] border-b border-gray-200">
              <div className="bg-[#015AFF] text-white font-semibold flex items-center px-4 py-3 text-center justify-center h-[80px] w-[78px] whitespace-nowrap">
                {label}
              </div>
              <div className="p-4">{element}</div>
            </div>
          ))}
        </div>
        <div className="w-[1122px] mt-4">
          <button
            onClick={handleSendNotification}
            className="flex items-center justify-center bg-blue-600 text-white px-6 py-2 hover:bg-blue-700 w-[92px] h-[48px] whitespace-nowrap"
          >
            알림 전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
