import { useState } from "react";
import NewLectureList from "./NewLectureList";
import { newLectureType } from "../../../../interface/interface";

const emptyLecture = {
  title: "",
  instructor: "",
  time: [
    {
      day: "",
      startH: "09",
      startM: "00",
      endH: "10",
      endM: "00",
      location: "",
    },
  ],
} as newLectureType;
const hours = [
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
];
const minutes = [
  "00",
  "05",
  "10",
  "15",
  "20",
  "25",
  "30",
  "35",
  "40",
  "45",
  "50",
  "55",
];

const NewLecture = ({
  currentSemester,
  resizeContainer,
  addLectureToTable,
  addCustomLectureToTable,
}: {
  currentSemester: string;
  resizeContainer: Function;
  addLectureToTable: Function;
  addCustomLectureToTable: Function;
}) => {
  const [newLecture, setNewLecture] = useState<newLectureType>(emptyLecture);
  const [isOpen, setIsOpen] = useState<"button" | "search" | "create">(
    "button"
  );

  const changeDay = (key: number, input: string) => {
    const original = newLecture.time;
    original.splice(key, 1, {
      ...newLecture.time[key],
      day: input,
    });
    setNewLecture({
      ...newLecture,
      time: original,
    });
  };

  const changeTimeData = (key: number, type: string, input: string) => {
    const original = newLecture.time;
    original.splice(key, 1, {
      ...newLecture.time[key],
      [type]: input,
    });
    setNewLecture({
      ...newLecture,
      time: original,
    });
  };

  const lectureTimeInput = (key: number) => {
    return (
      <>
        <ul className="day">
          <li
            key="월"
            className={`day-item ${
              newLecture.time.length > key
                ? newLecture.time[key].day === "월"
                  ? "selected"
                  : null
                : null
            }`}
            onClick={(e) => {
              changeTimeData(key, "day", "월");
            }}
          >
            월
          </li>
          <li
            key="화"
            className={`day-item ${
              newLecture.time.length > key
                ? newLecture.time[key].day === "화"
                  ? "selected"
                  : null
                : null
            }`}
            onClick={(e) => {
              changeTimeData(key, "day", "화");
            }}
          >
            화
          </li>
          <li
            key="수"
            className={`day-item ${
              newLecture.time.length > key
                ? newLecture.time[key].day === "수"
                  ? "selected"
                  : null
                : null
            }`}
            onClick={(e) => {
              changeTimeData(key, "day", "수");
            }}
          >
            수
          </li>
          <li
            key="목"
            className={`day-item ${
              newLecture.time.length > key
                ? newLecture.time[key].day === "목"
                  ? "selected"
                  : null
                : null
            }`}
            onClick={(e) => {
              changeTimeData(key, "day", "목");
            }}
          >
            목
          </li>
          <li
            key="금"
            className={`day-item ${
              newLecture.time.length > key
                ? newLecture.time[key].day === "금"
                  ? "selected"
                  : null
                : null
            }`}
            onClick={(e) => {
              changeTimeData(key, "day", "금");
            }}
          >
            금
          </li>
        </ul>
        <div className="timeplace">
          <select
            value={newLecture.time[key].startH}
            onChange={(e) => {
              changeTimeData(key, "startH", e.target.value);
            }}
          >
            {hours.map((hour) => (
              <option value={hour}>{hour}</option>
            ))}
          </select>
          시
          <select
            value={newLecture.time[key].startM}
            onChange={(e) => {
              changeTimeData(key, "startM", e.target.value);
            }}
          >
            {minutes.map((minute) => (
              <option value={minute}>{minute}</option>
            ))}
          </select>
          분 ~{"  "}
          <select
            value={newLecture.time[key].endH}
            onChange={(e) => {
              changeTimeData(key, "endH", e.target.value);
            }}
          >
            {hours.map((hour) => (
              <option value={hour}>{hour}</option>
            ))}
          </select>
          시
          <select
            value={newLecture.time[key].endM}
            onChange={(e) => {
              changeTimeData(key, "endM", e.target.value);
            }}
          >
            {minutes.map((minute) => (
              <option value={minute}>{minute}</option>
            ))}
          </select>
          분
          <input
            type="text"
            placeholder="예) 종303"
            value={newLecture.time[key].location}
            onChange={(e) => {
              changeTimeData(key, "location", e.target.value);
            }}
          />
        </div>
      </>
    );
  };
  const lectureTimeInputArray = () => {
    const results = [<div />];
    newLecture.time.forEach((time, index) => {
      results.push(lectureTimeInput(index));
    });
    return results;
  };

  const changeOpenMode = (input: "button" | "search" | "create") => {
    setIsOpen(input);
    if (input === "search") {
      resizeContainer(true);
    } else {
      resizeContainer(false);
    }
  };

  return (
    <>
      {isOpen !== "search" && (
        <div className="NewLecture">
          {isOpen === "button" && (
            <div className="NewLecture__button">
              <button
                className="search"
                onClick={() => {
                  setIsOpen("search");
                  resizeContainer(true);
                }}
              >
                목록에서 검색
              </button>
              <button
                className="create"
                onClick={() => {
                  setIsOpen("create");
                }}
              >
                새 수업 추가
              </button>
            </div>
          )}
          {isOpen === "create" && (
            <form
              className="NewLecture__create"
              onSubmit={(e) => {
                e.preventDefault();
                addCustomLectureToTable(newLecture);
              }}
            >
              <p>새 수업 추가</p>
              <div className="label">과목명 (필수)</div>
              <div
                className="close"
                onClick={() => {
                  setIsOpen("button");
                  setNewLecture(emptyLecture);
                }}
              />
              <input
                type="text"
                className="full-size-input"
                placeholder="예) 경제학입문"
                value={newLecture.title}
                onChange={(e) => {
                  setNewLecture({ ...newLecture, title: e.target.value });
                }}
              />
              <div className="label">교수명</div>
              <input
                type="text"
                className="full-size-input"
                placeholder="예) 홍길동"
                value={newLecture.instructor}
                onChange={(e) => {
                  setNewLecture({ ...newLecture, instructor: e.target.value });
                }}
              />
              <div className="label">시간/장소</div>
              <div className="NewLecture__time-wrapper">
                {lectureTimeInputArray()}
              </div>
              {newLecture.time.length < 5 ? (
                <div
                  className="more-time"
                  onClick={() => {
                    if (newLecture.time.length < 6) {
                      setNewLecture({
                        ...newLecture,
                        time: [
                          ...newLecture.time,
                          {
                            day: "",
                            startH: "09",
                            startM: "00",
                            endH: "10",
                            endM: "00",
                            location: "",
                          },
                        ],
                      });
                    }
                  }}
                >
                  +더 입력
                </div>
              ) : null}
              <input type="submit" value="저장" />
            </form>
          )}
        </div>
      )}
      {isOpen === "search" && (
        <NewLectureList
          currentSemester={currentSemester}
          changeOpenMode={changeOpenMode}
          addLectureToTable={addLectureToTable}
        />
      )}
    </>
  );
};

export default NewLecture;
