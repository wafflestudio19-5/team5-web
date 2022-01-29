import Schedule from "./Schedule/Schedule";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  deleteTimeTable,
  deleteTimeTableLecture,
  getTimeTableById,
  getTimeTableBySemester,
  postTimeTable,
  postTimeTableLecture,
  putTimeTable,
} from "../../../API/timetableAPI";
import {
  TimeTableType,
  TimeTableSettingsType,
  newLectureType,
  LectureScheduleType,
} from "../../../interface/interface";
import { toastErrorData } from "../../../API/errorHandling";
import NewLecture from "./NewLecture/NewLecture";
import { time } from "../../../function/timeCal";
import { calculateCredit } from "../../../function/lecture";
import { postCustomLecture } from "../../../API/lectureAPI";

interface TimeTableParams {
  year: string;
  season: string;
  scheduleId: string;
}

const emptyTable = {} as TimeTableType;
const emptySettings = {} as TimeTableSettingsType;

const semesters = [
  "2021년 1학기",
  "2021년 2학기",
  "2021년 겨울학기",
  "2022년 1학기",
];
const semestersToYearSeason = (semesterString: string) => {
  const split = semesterString.split(" ");
  return { year: split[0].slice(0, -1), season: split[1].slice(0, -2) };
};

const TimeTable = () => {
  const history = useHistory();
  const params: TimeTableParams = useParams();

  const [reloading, setReloading] = useState<boolean>(false);
  const [reloadingSelected, setReloadingSelected] = useState<boolean>(false);

  //기본
  const [currentSemester, setCurrentSemester] = useState({
    name: "2022년 1학기",
    year: "2022",
    season: "1",
  });
  const [currentTables, setCurrentTables] = useState<TimeTableType[]>([]);
  const [selectedTable, setSelectedTable] = useState<TimeTableType>(emptyTable);
  const [previewLectures, setPreviewLectures] = useState<LectureScheduleType[]>(
    []
  );

  //수정할것
  const [resizeContainer, setResizeContainer] = useState(false);

  //modal 관련
  const [tableSettings, setTableSettings] =
    useState<TimeTableSettingsType>(emptySettings);
  const [modalIsOpen, setModalIsOpen] = useState<string | boolean>(false);

  //Button Functions
  const addNewTable = () => {
    postTimeTable(currentSemester.name).then((response) => {
      history.push(
        `/timetable/${currentSemester.year}/${currentSemester.season}/${response.id}`
      );
    });
  };
  const modifyTable = () => {
    putTimeTable(String(selectedTable.id), tableSettings).then((response) => {
      setModalIsOpen(false);
      setReloading(true);
    });
  };
  const deleteTable = () => {
    if (window.confirm("시간표를 삭제하시겠습니까?")) {
      deleteTimeTable(String(selectedTable.id)).then(() => {
        history.push(
          `/timetable/${currentSemester.year}/${currentSemester.season}/`
        );
        setModalIsOpen(false);
      });
    }
  };
  const addLectureToTable = (lectureId: number) => {
    postTimeTableLecture(selectedTable.id, lectureId).then(
      (response) => {
        setSelectedTable(response);
      },
      (error) => {
        toastErrorData(error.response.data);
      }
    );
  };
  const addCustomLectureToTable = (input: newLectureType) => {
    const requestTime: string[] = [];
    input.time.forEach((time) => {
      requestTime.push(
        `${time.day}/${time.startH}${time.startM}/${time.endH}${time.endM}/${time.location}`
      );
    });
    postCustomLecture(selectedTable.id, { ...input, time: requestTime }).then(
      (response) => {
        setSelectedTable(response);
      },
      (error) => {
        toastErrorData(error.response.data);
      }
    );
  };

  const deleteLectureFromTable = (lectureId: number) => {
    if (window.confirm("강의를 삭제하시겠습니까?")) {
      deleteTimeTableLecture(selectedTable.id, lectureId).then(
        (response) => {
          setSelectedTable(response);
        },
        (error) => {
          toastErrorData(error.response.data);
        }
      );
    }
  };

  useEffect(() => {}, [selectedTable]);

  //useEffects
  useEffect(() => {
    if (params.year) {
      if (params.season) {
        const semester = `${params.year}년 ${params.season}학기`;
        if (semesters.includes(semester)) {
          setCurrentSemester({
            name: semester,
            year: params.year,
            season: params.season,
          });
        } else {
          history.push("/timetable");
        }
      }
    }
  }, [params]);

  useEffect(() => {
    getTimeTableBySemester(currentSemester.name).then((response) => {
      setCurrentTables(response);
    });
    if (reloading) {
      setReloading(false);
    }
  }, [currentSemester, reloading]);

  useEffect(() => {
    if (params.scheduleId) {
      getTimeTableById(params.scheduleId).then(
        (response) => {
          setSelectedTable(response);
        },
        (error) => {
          history.push(
            `/timetable/${currentSemester.year}/${currentSemester.season}`
          );
          toastErrorData(error.response.data);
        }
      );
    } else {
      const targetTable = currentTables.find((table) => table.is_default);
      if (targetTable) {
        getTimeTableById(String(targetTable.id)).then(
          (response) => {
            setSelectedTable(response);
          },
          (error) => {
            history.push(
              `/timetable/${currentSemester.year}/${currentSemester.season}`
            );
            toastErrorData(error.response.data);
          }
        );
      }
    }
  }, [params, currentTables, reloadingSelected]);
  return (
    <div className={`TimeTable ${resizeContainer && "search-open-size"}`}>
      <div className="TimeTable__container">
        <div className="TimeTable__menu-wrapper">
          <select
            className="TimeTable__menu__select"
            value={currentSemester.name}
            onChange={(e) => {
              const yearSeason = semestersToYearSeason(e.target.value);
              history.push(
                `/timetable/${yearSeason.year}/${yearSeason.season}`
              );
            }}
          >
            {semesters.map((semester) => {
              return <option value={semester}>{semester}</option>;
            })}
          </select>
          <div className="TimeTable__menu__info">
            <h3>{selectedTable.name}</h3>
            <p>
              {calculateCredit(selectedTable.lecture)}학점{" "}
              {time(selectedTable.updated_at)}
            </p>
            <div className="TimeTable__menu__buttons">
              <button className="image">이미지</button>
              <button
                className="settings"
                onClick={() => {
                  setTableSettings({
                    name: selectedTable.name,
                    private: selectedTable.private,
                    is_default: selectedTable.is_default,
                  });
                  setModalIsOpen("settings");
                }}
              >
                설정
              </button>
            </div>
          </div>
          <ul className="TimeTable__menu__list">
            {currentTables.map((table) => {
              return (
                <li
                  key={table.id}
                  className={`TimeTable__menu__item ${
                    table.id === selectedTable.id ? "selected" : ""
                  }`}
                  onClick={() => {
                    history.push(
                      `/timetable/${currentSemester.year}/${currentSemester.season}/${table.id}`
                    );
                  }}
                >
                  {table.name}
                  {table.is_default ? (
                    <div className="default">기본시간표</div>
                  ) : null}
                </li>
              );
            })}
            <li
              key="addItem"
              className="TimeTable__menu__item addItem"
              onClick={addNewTable}
            >
              + 새 시간표 만들기
            </li>
          </ul>
        </div>
        <Schedule
          lectures={selectedTable.lecture}
          deleteLectureFromTable={deleteLectureFromTable}
          previewLectures={previewLectures}
        />
        {modalIsOpen && (
          <div
            className="TimeTable__modal-wrapper"
            onClick={() => {
              setModalIsOpen(false);
            }}
          >
            {/*<div className="TimeTable__modal-export"></div>*/}
            <form
              className="TimeTable__modal settings"
              onSubmit={(e) => {
                e.preventDefault();
                modifyTable();
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <p className="modal-name">시간표 설정</p>
              <p className="label">이름</p>
              <input
                type="text"
                value={tableSettings.name}
                onChange={(e) => {
                  setTableSettings({ ...tableSettings, name: e.target.value });
                }}
              />
              <p className="label">공개 범위</p>
              <input
                type="radio"
                name="private"
                value="전체공개"
                checked={tableSettings.private === "전체공개"}
                onChange={(e) => {
                  setTableSettings({
                    ...tableSettings,
                    private: e.target.value,
                  });
                }}
              />{" "}
              전체 공개
              <input
                type="radio"
                name="private"
                value="친구공개"
                checked={tableSettings.private === "친구공개"}
                onChange={(e) => {
                  setTableSettings({
                    ...tableSettings,
                    private: e.target.value,
                  });
                }}
              />{" "}
              친구 공개
              <input
                type="radio"
                name="private"
                value="비공개"
                checked={tableSettings.private === "비공개"}
                onChange={(e) => {
                  setTableSettings({
                    ...tableSettings,
                    private: e.target.value,
                  });
                }}
              />{" "}
              비공개
              <p className="label">기본</p>
              <input
                type="checkbox"
                name="default"
                checked={tableSettings.is_default}
                onChange={(e) => {
                  if (e.target.checked) {
                    setTableSettings({ ...tableSettings, is_default: true });
                  } else {
                    setTableSettings({ ...tableSettings, is_default: false });
                  }
                }}
              />
              기본
              <div className="modal-buttons">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteTable();
                  }}
                >
                  삭제
                </button>
                <input type="submit" value="설정 저장" />
              </div>
              <div
                className="close"
                onClick={() => {
                  setModalIsOpen(false);
                }}
              />
            </form>
          </div>
        )}
      </div>
      <NewLecture
        currentSemester={currentSemester.name}
        resizeContainer={setResizeContainer}
        addLectureToTable={addLectureToTable}
        addCustomLectureToTable={addCustomLectureToTable}
        setPreviewLectures={setPreviewLectures}
      />
    </div>
  );
};

export default TimeTable;
