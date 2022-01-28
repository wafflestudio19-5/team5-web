import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getLectureEval,
  getLectureInformation,
  getLectureSummary,
  getLectureTest,
  postEvalLike,
  postNewEval,
  postNewTest,
  postTestLike,
  postTestPoint,
} from "../../../../API/lectureAPI";
import {
  EvalType,
  LectureInformationType,
  LectureSummaryType,
  NewEvalType,
  LectureTestType,
  NewTestType,
} from "../../../../interface/interface";
import { toastErrorData } from "../../../../API/errorHandling";
import { newEvalForm, newTestForm } from "../../../../function/eval";

interface LectureViewParams {
  id: string;
}

const emptyEval = {
  semester: "",
  assignment: 1,
  team_project: 1,
  grade: 1,
  attendance: 2,
  exam: 2,
  rating: 3,
  content: "",
};
const emptyTest = {
  semester: "",
  exam: 0,
  types: [],
  examples: ["", ""],
  strategy: "",
};

const emptyInfo = {} as LectureInformationType;
const emptySummary = {} as LectureSummaryType;
const LectureView = () => {
  const params = useParams<LectureViewParams>();
  const [lectureInfo, setLectureInfo] =
    useState<LectureInformationType>(emptyInfo);
  const [lectureSummary, setLectureSummary] =
    useState<LectureSummaryType>(emptySummary);
  const [lectureEval, setLectureEval] = useState<EvalType[]>([]);
  const [lectureTest, setLectureTest] = useState<LectureTestType[]>([]);
  const [reloading, setReloading] = useState<boolean>(true);

  //modal
  const [modalState, setModalState] = useState<string>("no-modal");
  const [newEval, setNewEval] = useState<NewEvalType>(emptyEval);
  const [newTest, setNewTest] = useState<NewTestType>(emptyTest);

  const readTest = (testId: number) => {
    if (window.confirm("5포인트를 차감하시겠습니까?")) {
      postTestPoint(lectureInfo.id, testId).then(
        (response) => {
          setLectureTest(response);
        },
        (error) => {
          toastErrorData(error.response.data);
        }
      );
    }
  };
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
  const recommendTest = (testId: number) => {
    if (window.confirm("이 시험 정보를 추천하시겠습니까?")) {
      postTestLike(lectureInfo.id, testId).then(
        () => {
          setReloading(true);
        },
        (error) => {
          toastErrorData(error.response.data);
        }
      );
    }
  };
  const writeEval = () => {
    postNewEval(lectureInfo.id, newEval).then(
      (response) => {
        setReloading(true);
        setNewEval(emptyEval);
        setModalState("no-modal");
      },
      (error) => {
        toastErrorData(error.response.data);
      }
    );
  };
  const writeTest = () => {
    postNewTest(lectureInfo.id, newTest).then(
      (response) => {
        setReloading(true);
        setNewTest(emptyTest);
        setModalState("no-modal");
      },
      (error) => {
        toastErrorData(error.response.data);
      }
    );
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
      getLectureTest(params.id).then((response) => {
        setLectureTest(response);
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
          <div className="LectureView__eval-test-container">
            <div className="LectureView__evaluation">
              <button
                className="post-button"
                onClick={() => {
                  setModalState("eval");
                }}
              >
                새 강의평 쓰기
              </button>
              {lectureSummary.has_evals ? (
                <>
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
                      <p>{lectureSummary.exam_freq}</p>
                    </div>
                  </div>
                  <ul className="LectureView__evaluation-list">
                    {lectureEval.map((item) => {
                      return (
                        <li
                          key={item.id}
                          className="LectureView__evaluation-item"
                        >
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
                </>
              ) : null}
            </div>
            <div className="LectureView__test">
              <p className="mini-title">시험 정보</p>
              <button
                className="post-button"
                onClick={() => {
                  setModalState("test");
                }}
              >
                시험 정보 공유
              </button>
              <ul className="LectureView__test-list">
                {lectureTest.map((item) => {
                  return (
                    <li key={item.id}>
                      {item.is_readable ? (
                        <div className="LectureView__test-item">
                          {!item.is_mine && (
                            <button
                              className="recommend"
                              onClick={() => {
                                recommendTest(item.id);
                              }}
                            >
                              추천
                            </button>
                          )}
                          <div className="mini-title">{item.exam}</div>
                          <div className="semester">{item.semester}</div>
                          {item.num_of_likes > 0 ? (
                            <div className="likes">{item.num_of_likes}</div>
                          ) : null}
                          <div className="contents">
                            <div className="content-block">
                              <div className="label">시험 전략</div>
                              <div className="content">{item.strategy}</div>
                            </div>
                            <div className="content-block">
                              <div className="label">문제 유형</div>
                              <div className="content">{item.types}</div>
                            </div>
                            <div className="content-block">
                              <div className="label">문제 예시</div>
                              <div className="examples">
                                {item.examples?.map((example) => {
                                  return <p>{example}</p>;
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="LectureView__test-item">
                          <div className="mini-title">{item.exam}</div>
                          <div className="semester">{item.semester}</div>
                          {item.num_of_likes > 0 ? (
                            <div className="likes">{item.num_of_likes}</div>
                          ) : null}
                          <div className="contents blur">
                            <div className="content-block">
                              <div className="label">시험 전략</div>
                              <div className="content">
                                시험 전략이 궁금하면 포인트를 사용하세요
                              </div>
                            </div>
                            <div className="content-block">
                              <div className="label">문제 유형</div>
                              <div className="content">
                                시험 전략이 궁금하면 포인트를 사용하세요
                              </div>
                            </div>
                            <div className="content-block">
                              <div className="label">문제 예시</div>
                              <div className="examples">
                                문제 예시가 궁금하면 포인트를 사용하세요
                              </div>
                            </div>
                          </div>
                          <div className="unlock">
                            이 정보를 읽기 위해 5포인트가 차감됩니다.
                            <br />
                            1회 차감 이후에는 다시 읽을 수 있습니다.
                          </div>
                          <button
                            className="use-point"
                            onClick={() => {
                              readTest(item.id);
                            }}
                          >
                            포인트 사용
                          </button>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {modalState === "no-modal" ? null : (
            <div className="LectureView__modal-wrapper">
              {modalState === "eval" ? (
                <form
                  className="LectureView__modal eval"
                  onSubmit={(e) => {
                    e.preventDefault();
                    writeEval();
                  }}
                >
                  <div className="title"> 새 강의평 쓰기</div>
                  {newEvalForm(setNewEval, newEval, lectureInfo.sem_options)}
                  <div
                    className="close"
                    onClick={() => {
                      setModalState("no-modal");
                    }}
                  />
                </form>
              ) : (
                <form
                  className="LectureView__modal test"
                  onSubmit={(e) => {
                    e.preventDefault();
                    writeTest();
                  }}
                >
                  <div className="title"> 시험 정보 공유</div>
                  {newTestForm(setNewTest, newTest, lectureInfo.sem_options)}
                  <div
                    className="close"
                    onClick={() => {
                      setModalState("no-modal");
                    }}
                  />
                </form>
              )}
            </div>
          )}
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default LectureView;
