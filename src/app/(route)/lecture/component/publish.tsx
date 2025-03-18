'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import lectureResponse from '@/dummyData/lecture/getLecture.json';
import reviewResponse from '@/dummyData/lecture/getReview.json';
import questionResponse from '@/dummyData/lecture/getQuestion.json';

interface LectureDetailProps {
  id: number;
  title: string;
  description: string;
  category: string;
  start_time: string;
  end_time: string;
  location: string;
  userId: number;
  status: string;
}

interface ReviewProps {
  id: number;
  userId: number;
  username: string;
  content: string;
  rating: number;
  createdAt: string;
}

interface QuestionProps {
  id: number;
  user_id: number;
  lecture_id: number;
  contents: string;
}

const LectureDetailPage = () => {
  const params = useParams();
  const lectureId = params.id as string;
  const [lecture, setLecture] = useState<LectureDetailProps>();
  const [reviews, setReviews] = useState<ReviewProps[]>([]);
  const [questions, setQuestions] = useState<QuestionProps[]>([]);

  useEffect(() => {
    // const fetchLectureDetail = async () => {
    //   try {
    //     const response = await fetch(`/api/lectures/${lectureId}`);
    //     if (!response.ok) {
    //       throw new Error('네트워크 응답 오류');
    //     }
    //     const lectureDetail: { data: LectureDetailProps } = await response.json();
    //     setLecture(lectureDetail.data);
    //   } catch (error) {
    //     console.error('데이터 불러오기 실패: ', error);
    //   }
    // };

    // fetchLectureDetail();
    setLecture(lectureResponse.data);
    setReviews(reviewResponse.data.reviews);
    setQuestions(questionResponse.data);
  }, []);

  if (!lecture) return <p>로딩 중...</p>;

  return (
    <div className="flex flex-col pt-10 gap-10">
      <div>
        <h1>강의 {lectureId}에 대한 상세 정보</h1>
        <h2>강의제목: {lecture.title}</h2>
        <p>강의소개: {lecture.description}</p>
        <p>카테고리: {lecture.category}</p>
        <p>
          시간: {lecture.start_time} ~ {lecture.end_time}
        </p>
        <p>장소: {lecture.location}</p>
        <p>상태: {lecture.status}</p>
      </div>
      <div>
        <h2>사전질문</h2>
        {questions.length > 0 ? (
          <ul>
            {questions
              .filter((q) => q.lecture_id === Number(lectureId))
              .map((question) => (
                <li key={question.id}>
                  <p>유저 ID: {question.user_id}</p>
                  <p>{question.contents}</p>
                </li>
              ))}
          </ul>
        ) : (
          <p>사전 질문이 없습니다.</p>
        )}
      </div>
      <div>
        <h2>리뷰</h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <p>
                  <strong>{review.username}</strong> ({review.rating}⭐)
                </p>
                <p>{review.content}</p>
                <p>
                  <small>{review.createdAt}</small>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>등록된 리뷰가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default LectureDetailPage;
