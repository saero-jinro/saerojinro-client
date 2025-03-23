'use client';

import { useState } from 'react';
import useUpload from './util/upload';
import TextEditor from '@/_components/TextEditor/TextEditor';
import useTextEditor from '@/_hooks/textEditor/useTextEditor';
import { Category, InputLectureFormData } from '@/_types/Write/write.type';
import { compressToEncodedURIComponent } from 'lz-string';

const LectureForm = () => {
  const [formData, setFormData] = useState<InputLectureFormData>({
    title: '',
    contents: '',
    thumbnailId: '',
    materialId: null,
    maxCapacity: 0,
    startTime: '',
    endTime: '',
    location: '',
    category: Category.BACKEND,
    speakerName: '',
    speakerEmail: '',
    speakerPosition: '',
    speakerIntroduction: '',
    speakerFilmography: [],
    speakerPhotoId: '',
  });

  const { submitLecture } = useUpload();
  const editor = useTextEditor('write');

  const isFormDataComplete = (data: InputLectureFormData): boolean => {
    return (
      data.title.trim().length > 0 &&
      data.contents.trim().length > 0 &&
      data.thumbnailId.trim().length > 0 &&
      data.materialId !== null &&
      data.maxCapacity > 0 &&
      data.startTime.trim().length > 0 &&
      data.endTime.trim().length > 0 &&
      data.location.trim().length > 0 &&
      data.speakerName.trim().length > 0 &&
      data.speakerEmail.trim().length > 0 &&
      data.speakerPosition.trim().length > 0 &&
      data.speakerIntroduction.trim().length > 0 &&
      data.speakerFilmography.length > 0 &&
      data.speakerPhotoId !== null
    );
  };

  // // 강연자 파일
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    if (!file.name.endsWith('.zip')) {
      alert('zip 파일만 업로드 가능합니다.');
      e.target.value = ''; // input 초기화
      return;
    }

    setFormData((prev) => ({
      ...prev,
      materialId: file,
    }));
  };

  // // 체인지 핸들러
  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //#region
  const handleFilmographyKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = e.currentTarget.value.trim();
      if (value) {
        setFormData((prev) => ({
          ...prev,
          speakerFilmography: [...prev.speakerFilmography, value],
        }));
        e.currentTarget.value = '';
      }
    }
  };

  const handleRemoveFilmography = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      speakerFilmography: prev.speakerFilmography.filter((_, i) => i !== index),
    }));
  };

  // //#endregion

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editor.editor) {
      alert('내용을 입력하세요');
      return;
    }

    const editorJson = editor.editor?.getJSON();
    const compressed = compressToEncodedURIComponent(JSON.stringify(editorJson));
    const formDto = {
      ...formData,
      contents: compressed,
    };

    if (!isFormDataComplete(formDto)) {
      console.log(formDto);
      alert('내용을 전부 입력하세요');
      return;
    }
    submitLecture(formDto);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-3xl mx-auto bg-white shadow-md rounded-lg space-y-4"
    >
      {/* 강의 제목 */}
      <label htmlFor="title" className="block">
        <span className="text-gray-700">강의 제목</span>
        <input
          aria-label="강의 제목"
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border rounded"
        />
      </label>

      {/* 강의 내용 */}
      <div className="border p-[20px] rounded-xl">
        <span className="text-gray-700">강의 내용</span>
        <TextEditor desc="에디터" {...editor} />
      </div>

      {/* 썸네일 파일 업로드 */}
      <label htmlFor="thumbnailId" className="block">
        <span className="text-gray-700">강의 썸네일 (URL)</span>
        <input
          aria-label="강의 썸네일"
          id="thumbnailId"
          type="text"
          name="thumbnailId"
          value={formData.thumbnailId}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border rounded"
        />
      </label>

      {/* 강의 자료 파일 업로드 */}
      <label className="block">
        <span className="text-gray-700">강의 자료</span>
        <input
          aria-label="강의 자료 파일"
          type="file"
          name="materialId"
          onChange={handleFileChange}
          className="mt-1 block w-full p-2 border rounded"
        />
      </label>

      {/* 최대 수용 인원 */}
      <label className="block">
        <span className="text-gray-700">최대 수용 인원</span>
        <input
          aria-label="최대 수용 인원"
          type="number"
          name="maxCapacity"
          value={formData.maxCapacity}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border rounded"
        />
      </label>

      {/* 강의 시작/종료 시간 */}
      <div className="flex space-x-4">
        <label className="block flex-1">
          <span className="text-gray-700">시작 시간</span>
          <input
            aria-label="시작 시간"
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
          />
        </label>
        <label className="block flex-1">
          <span className="text-gray-700">종료 시간</span>
          <input
            aria-label="종료 시간"
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
          />
        </label>
      </div>

      {/* 강의 장소 */}
      <label className="block">
        <span className="text-gray-700">강의 장소</span>
        <input
          aria-label="강의 장소"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border rounded"
        />
      </label>

      {/* 카테고리 선택 */}
      <label className="block">
        <span className="text-gray-700">강의 카테고리</span>
        <select
          aria-label="강의 카테고리"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border rounded"
        >
          {Object.values(Category).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>

      {/* 강연자 정보 */}
      <fieldset className="border p-4 rounded">
        <legend className="text-gray-700">강연자 정보</legend>

        <label className="block">
          <span className="text-gray-700">강연자 이름</span>
          <input
            aria-label="강연자 이름"
            type="text"
            name="speakerName"
            value={formData.speakerName}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">강연자 이메일</span>
          <input
            aria-label="강연자 이메일"
            type="email"
            name="speakerEmail"
            value={formData.speakerEmail}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">강연자 직책</span>
          <input
            aria-label="강연자 직책"
            type="text"
            name="speakerPosition"
            value={formData.speakerPosition}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">강연자 소개</span>
          <textarea
            aria-label="강연자 소개"
            name="speakerIntroduction"
            value={formData.speakerIntroduction}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
            rows={3}
          ></textarea>
        </label>

        <fieldset className="border p-4 rounded">
          <legend className="text-gray-700">강연자 필모그래피</legend>

          {/* 필모그래피 입력 필드 */}
          <input
            aria-label="필모그래피 추가"
            type="text"
            placeholder="필모그래피 추가 (Enter 입력)"
            onKeyDown={handleFilmographyKeyPress}
            className="w-full p-2 border rounded mb-2"
          />

          {/* 추가된 필모그래피 목록 */}
          {formData.speakerFilmography.map((filmography, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 p-2 rounded mb-2"
            >
              <span>{filmography}</span>
              <button
                type="button"
                onClick={() => handleRemoveFilmography(index)}
                className="text-red-500 hover:underline"
              >
                삭제
              </button>
            </div>
          ))}
        </fieldset>

        {/* 강연자 사진 등록 */}
        <label htmlFor="speakerPhotoId" className="block">
          <span className="text-gray-700">강연자 프로필 사진 (URL)</span>
          <input
            aria-label="강연자 프로필 사진"
            id="speakerPhotoId"
            type="text"
            name="speakerPhotoId"
            value={formData.speakerPhotoId}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border rounded"
          />
        </label>
      </fieldset>

      {/* 제출 버튼 */}
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        제출
      </button>
    </form>
  );
};

export default LectureForm;
