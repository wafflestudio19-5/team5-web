import { useEffect, useRef, useState } from "react";
import { EvalType, myLectureType } from "../../../interface/interface";
import { getMyLecture, getRecentLecture } from "../../../API/lectureAPI";
import { Link, useHistory } from "react-router-dom";
import { generateStar } from "../../../function/star";

const LectureList = () => {
  const history = useHistory();
  const [recentLecture, setRecentLecture] = useState<EvalType[]>([]);
  const [nextQuery, setNextQuery] = useState<string>("");
  const [myInfo, setMyInfo] = useState<{
    point: number;
    courses: myLectureType[];
  }>({ point: 0, courses: [] });
  const scrollRef = useRef<HTMLUListElement>(null);
  const loadLecture = () => {
    getRecentLecture(nextQuery).then((response) => {
      setRecentLecture([...recentLecture, ...response.results]);
      if (response.next) {
        setNextQuery(response.next.split("?")[1]);
      } else {
        setNextQuery("");
      }
    });
  };
  const loadMyLecture = () => {
    getMyLecture().then((response) => {
      setMyInfo(response);
      console.log(response);
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
    loadMyLecture();
  }, []);

  useEffect(() => {
    loadLecture();
  }, []);
  return (
    <>
      <div className="Lecture__my">
        <h3>내 강의평</h3>
        <ul className="Lecture__my-list">
          {myInfo.courses.map((course) => {
            return (
              <li
                key={course.id}
                onClick={() => {
                  history.push(`/lecture/view/${course.id}`);
                }}
              >
                <span className="title">{course.title}</span>
                {course.instructor}
                <button>평가하기</button>
              </li>
            );
          })}
        </ul>
        <div className="Lecture__my-point">
          포인트 <b>{myInfo.point}P</b> <Link to="/lecture/point">자세히</Link>
        </div>
      </div>
      <ul className="Lecture__list" ref={scrollRef} onScroll={handleScroll}>
        <li key="label" className="Lecture__item-label">
          최근 강의평
        </li>
        {recentLecture.map((lecture) => {
          return (
            <li
              key={lecture.id}
              className="Lecture__item"
              onClick={() => {
                history.push(`/lecture/view/${lecture.course_id}`);
              }}
            >
              <p className="title">{lecture.course}</p>
              <div className="star">{generateStar(lecture.rating)}</div>
              <p className="semester">{lecture.semester}</p>
              <p>{lecture.content}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default LectureList;
