import { useEffect, useRef, useState } from "react";
import { EvalType } from "../../../interface/interface";
import { getRecentLecture } from "../../../API/lectureAPI";
import { useHistory } from "react-router-dom";

const LectureList = () => {
  const history = useHistory();
  const [recentLecture, setRecentLecture] = useState<EvalType[]>([]);
  const [nextQuery, setNextQuery] = useState<string>("");
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
    loadLecture();
  }, []);
  return (
    <>
      <div className="Lecture__my">
        <p>내 강의평</p>
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
                history.push(`/lecture/view/${lecture.id}`);
              }}
            >
              <p className="title">{lecture.course}</p>
              <p className="rating">{lecture.rating}</p>
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
