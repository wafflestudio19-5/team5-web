import { useEffect, useState } from "react";
import {
  LectureType,
  TimeTableSearchQueryType,
} from "../../../../interface/interface";
import { getSearchedLecture } from "../../../../API/lectureAPI";
import {
  convertLocationToString,
  convertTimeToString,
} from "../../../../function/lecture";

const emptyTimeTableSearchQuery = {
  semester: "",
  credits: "",
  department: "",
  title: "",
  instructor: "",
  course_code: "",
  location: "",
  ordering: "",
};

const emptyLectureItem = {
  id: 1,
  lecture_time: [
    {
      day: "수",
      start: 1300,
      end: 1550,
      location: "301-B119",
    },
  ],
  course: {
    title: "(공유)AI기초프로그래밍",
    instructor: "",
    rating: 4.4,
  },
  classification: "전선",
  degree: "학사",
  grade: 1,
  course_code: "M3500.000100",
  lecture_code: 1,
  credits: 3,
  lecture: 3,
  laboratory: 0,
  cart: 3,
  quota: 40,
  remark: null,
  semester: 1,
};

const NewLecture = ({
  currentSemester,
  resizeContainer,
  addLectureToTable,
}: {
  currentSemester: string;
  resizeContainer: Function;
  addLectureToTable: Function;
}) => {
  const [lectureList, setLectureList] = useState<LectureType[]>([]);
  const [timeTableSearchQuery, setTimeTableSearchQuery] =
    useState<TimeTableSearchQueryType>(emptyTimeTableSearchQuery);
  const [reloadSearch, setReloadSearch] = useState(false);

  //functions
  const addNewLecture = () => {};

  useEffect(() => {});

  useEffect(() => {
    getSearchedLecture({
      ...timeTableSearchQuery,
      semester: currentSemester,
    }).then((response) => {
      setLectureList(response.results);
    });
    setReloadSearch(false);
  }, [currentSemester, reloadSearch]);
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
      <ul className="NewLecture__search-list">
        {lectureList.map((item) => {
          return (
            <li
              className="NewLecture__search-item"
              key={item.id}
              onClick={() => {
                addLectureToTable(item.id);
              }}
            >
              <p>조회</p>
              <p>{item.classification}</p>
              <p>{item.degree}</p>
              <p>{item.grade}</p>
              <p>{item.lecture_code}</p>
              <p>
                <b>{item.course.title}</b>
              </p>
              <p>{item.course.instructor}</p>
              <p>{item.credits}</p>
              <p>{item.lecture}</p>
              <p>{item.laboratory}</p>
              <p>{convertTimeToString(item.lecture_time)}</p>
              <p>{convertLocationToString(item.lecture_time)}</p>
              <p>{item.course.rating}</p>
              <p>담은인원</p>
              <p>{item.quota}</p>
              <p>{item.remark}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NewLecture;
