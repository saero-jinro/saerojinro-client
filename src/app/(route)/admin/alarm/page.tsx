"use client";

import { useEffect, useState } from "react";

interface Lecture {
  id: number;
  title: string;
}

const NotificationPage = () => {
  const [category, setCategory] = useState("");
  const [lecture, setLecture] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [placeholder, setPlaceholder] = useState("내용을 입력하세요");
  const [lectureList, setLectureList] = useState<Lecture[]>([]);

  const isInit = category === "";
  const isEmergency = category === "긴급 공지";
  const isEdit = category === "강의 변경";
  const isCancel = category === "강의 취소";

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const res = await fetch(""); // 실제 API URI로 교체
        const data = await res.json();
        setLectureList(data);
      } catch (error) {
        console.error("강의 목록 불러오기 실패:", error);
      }
    };

    fetchLectures();
  }, []);

  return (
    <div className="flex flex-col items-center p-8 min-h-screen">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">알림 관리</h1>

        <div className="bg-white shadow rounded-md overflow-hidden">
          {[
            {
              label: "카테고리",
              element: (
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border p-2 rounded-md"
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
              label: "강의명",
              element: (
                <select
                  value={lecture}
                  onChange={(e) => setLecture(e.target.value)}
                  disabled={!isInit && (isEmergency)}
                  className={`w-full border p-2 rounded-md ${
                    !isInit && isEmergency ? "bg-gray-100 text-gray-400" : ""
                  }`}
                >
                  <option disabled value="" className="text-gray-400">
                    강의를 선택하세요
                  </option>
                  {lectureList.map((lec) => (
                    <option
                      key={lec.id}
                      value={lec.title}
                      className="whitespace-nowrap"
                    >
                      {lec.title}
                    </option>
                  ))}
                </select>
              ),
            },
            {
              label: "변경 날짜",
              element: (
                <select
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  disabled={!isInit && !(isEdit)}
                  className={`w-full border p-2 rounded-md ${
                    !isInit && !isEdit ? "bg-gray-100 text-gray-400" : ""
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
              label: "변경 시간",
              element: (
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  disabled={!isInit && !(isEdit)}
                  className={`w-full border p-2 rounded-md ${
                    !isInit && !isEdit ? "bg-gray-100 text-gray-400" : ""
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
              label: "변경 장소",
              element: (
                <select
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  disabled={!isInit && !(isEdit)}
                  className={`w-full border p-2 rounded-md ${
                    !isInit && !isEdit ? "bg-gray-100 text-gray-400" : ""
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
              label: "내용",
              element: (
                <input
                  type="text"
                  placeholder={placeholder}
                  value={message}
                  disabled={!isInit && !isEmergency}
                  onFocus={() =>
                    (isInit || isEmergency) && setPlaceholder("")
                  }
                  onBlur={() =>
                    (isInit || isEmergency) &&
                    setPlaceholder(message === "" ? "내용을 입력하세요" : "")
                  }
                  onChange={(e) => setMessage(e.target.value)}
                  className={`w-full border p-2 rounded-md ${
                    !isInit && !isEmergency ? "bg-gray-100 text-gray-400" : ""
                  }`}
                />
              ),
            },
          ].map(({ label, element }, idx) => (
            <div
              key={idx}
              className="grid grid-cols-[150px_1fr] border-b border-gray-200"
            >
              <div className="bg-blue-600 text-white font-semibold flex items-center px-4 py-3">
                {label}
              </div>
              <div className="p-3">{element}</div>
            </div>
          ))}

          <div className="p-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
              알림 전송
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
