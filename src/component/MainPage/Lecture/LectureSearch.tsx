import { useEffect, useState } from "react";
import { EvalType, SearchedLectureType } from "../../../interface/interface";
import { getRecentLecture, postSearchLecture } from "../../../API/lectureAPI";
import { useParams } from "react-router-dom";

interface LectureSearchParams {
  searchValue: string;
}
const LectureSearch = () => {
  const params = useParams<LectureSearchParams>();
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
      <li key="label" className="Lecture__item-label search"></li>

      {searchedLecture.length > 0 ? (
        searchedLecture.map((lecture) => {
          return (
            <li key={lecture.id} className="Lecture__item">
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
