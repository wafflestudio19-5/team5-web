import { useEffect } from "react";

const NewLecture = ({ resizeContainer }: { resizeContainer: Function }) => {
  useEffect(() => {});
  return (
    <div className="NewLecture__search">
      <div className="NewLecture__search-label">
        <ul className="NewLecture__search-filter"></ul>
        <div className="NewLecture__search-list-label">
          <p>계획서</p>
          <p>구분</p>
          <p>과정</p>
          <p>학년</p>
          <p>교과목번호</p>
          <p>교과목명</p>
          <p>담당교수</p>
          <p>학점</p>
          <p>강의</p>
          <p>실습</p>
          <p>수업교시</p>
          <p>강의실</p>
          <p>강의평</p>
          <p>담은인원</p>
          <p>정원</p>
          <p>비고</p>
        </div>
      </div>
      <ul className="NewLecture__search-list"></ul>
    </div>
  );
};

export default NewLecture;
