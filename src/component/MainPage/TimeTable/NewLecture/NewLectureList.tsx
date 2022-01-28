import { useEffect, useRef, useState } from "react";
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

const NewLecture = ({
  currentSemester,
  changeOpenMode,
  addLectureToTable,
  setPreviewLectures,
}: {
  currentSemester: string;
  changeOpenMode: Function;
  addLectureToTable: Function;
  setPreviewLectures: Function;
}) => {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [lectureList, setLectureList] = useState<LectureType[]>([]);
  const [timeTableSearchQuery, setTimeTableSearchQuery] =
    useState<TimeTableSearchQueryType>({ semester: "" });
  const [reloadSearch, setReloadSearch] = useState(false);
  const [nextQuery, setNextQuery] = useState<string>("");

  const loadLecture = () => {
    getSearchedLecture(nextQuery, {
      ...timeTableSearchQuery,
      semester: currentSemester,
    }).then((response) => {
      setLectureList([...lectureList, ...response.results]);
      if (response.next) {
        setNextQuery(response.next.split("?")[1]);
      } else {
        setNextQuery("");
      }
    });
  };

  const resetLecture = () => {
    getSearchedLecture("", {
      ...timeTableSearchQuery,
      semester: currentSemester,
    }).then((response) => {
      setLectureList([...response.results]);
      if (response.next) {
        setNextQuery(response.next.split("?")[1]);
      } else {
        setNextQuery("");
      }
    });
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollHeight = scrollRef.current.scrollHeight;
      const scrollTop = scrollRef.current.scrollTop;
      const clientHeight = scrollRef.current.clientHeight;
      if (scrollTop + clientHeight >= scrollHeight) {
        loadLecture();
      }
    }
  };

  useEffect(() => {
    resetLecture();
  }, [currentSemester, reloadSearch]);

  useEffect(() => {
    setNextQuery("");
  }, [timeTableSearchQuery]);

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
      <ul
        className="NewLecture__search-list"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {lectureList.map((item) => {
          return (
            <li
              className="NewLecture__search-item"
              key={item.id}
              onClick={() => {
                addLectureToTable(item.id);
              }}
              onMouseEnter={(e) => {
                setPreviewLectures([
                  {
                    id: -1,
                    title: item.course.title,
                    instructor: item.course.instructor,
                    credits: item.credits,
                    lecture_time: item.lecture_time,
                  },
                ]);
              }}
              onMouseLeave={(e) => {
                setPreviewLectures({});
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
      <button
        className="close"
        onClick={() => {
          changeOpenMode("button");
        }}
      >
        닫기
      </button>
    </div>
  );
};

export default NewLecture;
