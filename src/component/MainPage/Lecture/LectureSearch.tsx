import { useEffect, useState } from "react";
import { EvalType, SearchedLectureType } from "../../../interface/interface";
import { getRecentLecture, postSearchLecture } from "../../../API/lectureAPI";
import { useHistory, useParams } from "react-router-dom";

interface LectureSearchParams {
  searchValue: string;
}
const LectureSearch = () => {
  const params = useParams<LectureSearchParams>();
  const history = useHistory();
  const [searchedLecture, setSearchedLecture] = useState<SearchedLectureType[]>(
    []
  );
  const loadLecture = () => {
    postSearchLecture(params.searchValue).then((response) => {
      setSearchedLecture(response);
    });
  };

  useEffect(() => {
    loadLecture();
  }, [params.searchValue]);

  return (
    <ul className="Lecture__list">
      {searchedLecture.length > 0 ? (
        searchedLecture.map((lecture) => {
          return (
            <li
              key={lecture.id}
              className="Lecture__item"
              onClick={() => {
                history.push(`/lecture/view/${lecture.id}`);
              }}
            >
              <p className="title">
                {lecture.title} <span>{lecture.instructor}</span>
              </p>
              <p className="rating">{lecture.rating}</p>
            </li>
          );
        })
      ) : (
        <li key="noResult">강의가 없습니다</li>
      )}
    </ul>
  );
};

export default LectureSearch;
