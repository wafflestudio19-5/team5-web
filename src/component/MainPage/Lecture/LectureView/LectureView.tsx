import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getLectureEval,
  getLectureInformation,
  getLectureSummary,
  postEvalLike,
} from "../../../../API/lectureAPI";
import {
  EvalType,
  LectureInformationType,
  LectureSummaryType,
} from "../../../../interface/interface";
import { toastErrorData } from "../../../../API/errorHandling";

interface LectureViewParams {
  id: string;
}

const emptyInfo = {} as LectureInformationType;
const emptySummary = {} as LectureSummaryType;
const LectureView = () => {
  const params = useParams<LectureViewParams>();
  const [lectureInfo, setLectureInfo] =
    useState<LectureInformationType>(emptyInfo);
  const [lectureSummary, setLectureSummary] =
    useState<LectureSummaryType>(emptySummary);
  const [lectureEval, setLectureEval] = useState<EvalType[]>([]);
  const [reloading, setReloading] = useState<boolean>(true);

  const recommendEval = (evalId: number) => {
    if (window.confirm("이 강의평을 추천하시겠습니까?")) {
      postEvalLike(lectureInfo.id, evalId).then(
        () => {
          setReloading(true);
        },
        (error) => {
          toastErrorData(error.response.data);
        }
      );
    }
  };

  useEffect(() => {
    if (reloading) {
      getLectureInformation(params.id).then((response) => {
        setLectureInfo(response);
      });
      getLectureSummary(params.id).then((response) => {
        setLectureSummary(response);
      });
      getLectureEval(params.id).then((response) => {
        setLectureEval(response);
      });
      setReloading(false);
    }
  }, [params.id, reloading]);

  return (
    <div className="Lecture-wrapper">
      {lectureInfo.id ? (
        <div className="LectureView">
          <div className="LectureView__info">
            <p className="title">{lectureInfo.title}</p>
            <p>교수명 {lectureInfo.instructor}</p>
            <p>개설학기 {lectureInfo.sem_options.map((item) => item)}</p>
          </div>
          <div className="LectureView__evaluation">
            {lectureSummary.has_evals && (
              <div className="LectureView__evaluation-summary">
                <p className="mini-title">강의평</p>
                <p>평점: {lectureSummary.rating}</p>
                <div className="labels">
                  <p>과제</p>
                  <p>조모임</p>
                  <p>성적</p>
                  <p>출결</p>
                  <p>시험 횟수</p>
                </div>
                <div className="summaries">
                  <p>{lectureSummary.assignment}</p>
                  <p>{lectureSummary.team}</p>
                  <p>{lectureSummary.grade}</p>
                  <p>{lectureSummary.attendance}</p>
                  <p>{lectureSummary.attendance}</p>
                </div>
              </div>
            )}
            <ul className="LectureView__evaluation-list">
              {lectureEval.map((item) => {
                return (
                  <li key={item.id} className="LectureView__evaluation-item">
                    <div className="buttons">
                      <button
                        className="recommand"
                        onClick={() => {
                          recommendEval(item.id);
                        }}
                      >
                        추천
                      </button>
                      <button className="report">신고</button>
                    </div>
                    <p>{item.rating}</p>
                    <p>
                      {item.semester}
                      {item.num_of_likes > 0 ? (
                        <div className="likes">{item.num_of_likes}</div>
                      ) : null}
                    </p>
                    <p>{item.content}</p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="LectureView__test"></div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default LectureView;
