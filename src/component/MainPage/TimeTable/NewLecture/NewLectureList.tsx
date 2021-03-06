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
import { generateStar } from "../../../../function/star";
import { timetableQueryQuestion } from "../../../../function/eval";

const emptyTimeTableSearchQuery = {
  semester: "",
  credits: "",
  department: "",
  title: "",
  instructor: "",
  course_code: "",
  location: "",
  ordering: "",
  type: "",
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
  const [question, setQuestion] = useState<{ value: string; key: string }>({
    value: "",
    key: "",
  });

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

  const setQuery = (key: string, value: string | string[]) => {
    setTimeTableSearchQuery({ ...timeTableSearchQuery, [key]: value });
  };

  useEffect(() => {
    resetLecture();
  }, [currentSemester, reloadSearch, timeTableSearchQuery]);

  useEffect(() => {
    setNextQuery("");
  }, [timeTableSearchQuery]);

  return (
    <>
      <div className="NewLecture__search">
        <div className="NewLecture__search-label">
          <ul className="NewLecture__search-filter">
            <li></li>
          </ul>
          <div className="NewLecture__search-list-label">
            <p>?????????</p>
            <p>??????</p>
            <p>??????</p>
            <p>??????</p>
            <p>???????????????</p>
            <p>????????????</p>
            <p>????????????</p>
            <p>??????</p>
            <p>??????</p>
            <p>??????</p>
            <p>????????????</p>
            <p>?????????</p>
            <p>?????????</p>
            <p>????????????</p>
            <p>??????</p>
            <p>??????</p>
          </div>
        </div>
        {lectureList.length > 0 ? (
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
                  <p>??????</p>
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
                  {generateStar(item.course.rating)}
                  <p>{item.cart}</p>
                  <p>{item.quota}</p>
                  <p>{item.remark}</p>
                </li>
              );
            })}
          </ul>
        ) : null}
        <button
          className="close"
          onClick={() => {
            changeOpenMode("button");
          }}
        >
          ??????
        </button>
      </div>
      {/*<div className="NewLecture__modal-wrapper">*/}
      {/*  <div className="NewLecture__modal">*/}
      {/*    <div className="question">*/}
      {/*      <div className="label">?????????:</div>*/}
      {/*      <input*/}
      {/*        type="text"*/}
      {/*        value={question.value}*/}
      {/*        onChange={(e) => {*/}
      {/*          setQuestion({ ...question, value: e.target.value });*/}
      {/*        }}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    {timetableQueryQuestion(*/}
      {/*      "query",*/}
      {/*      "??????",*/}
      {/*      [*/}
      {/*        { name: "?????????", val: "title" },*/}
      {/*        { name: "?????????", val: "instructor" },*/}
      {/*      ],*/}
      {/*      question.value,*/}
      {/*      (key: string, value: string) => {*/}
      {/*        setQuestion({ ...question, key: value });*/}
      {/*      }*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*</div>*/}
    </>
  );
};

export default NewLecture;
