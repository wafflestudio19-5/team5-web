import Schedule from "./Schedule/Schedule";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  deleteTimeTable,
  getTimeTableById,
  getTimeTableBySemester,
  postTimeTable,
  putTimeTable,
} from "../../../API/timetableAPI";
import {
  TimeTableType,
  TimeTableSettingsType,
} from "../../../interface/interface";
import { toastErrorData } from "../../../API/errorHandling";

interface TimeTableParams {
  year: string;
  season: string;
  scheduleId: string;
}

const emptyTable = {} as TimeTableType;
const emptySettings = {} as TimeTableSettingsType;

const semesters = ["2021년 겨울학기", "2022년 1학기"];
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
    deleteTimeTable(String(selectedTable.id)).then(() => {
      history.push(
        `/timetable/${currentSemester.year}/${currentSemester.season}/`
      );
      setModalIsOpen(false);
    });
  };

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
          console.log("why?");
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
        setSelectedTable(targetTable);
      }
    }
  }, [params, currentTables, reloadingSelected]);
  return (
    <div className="TimeTable__container">
      <div className="TimeTable__menu-wrapper">
        <select
          className="TimeTable__menu__select"
          value={currentSemester.name}
          onChange={(e) => {
            const yearSeason = semestersToYearSeason(e.target.value);
            history.push(`/timetable/${yearSeason.year}/${yearSeason.season}`);
          }}
        >
          {semesters.map((semester) => {
            return <option value={semester}>{semester}</option>;
          })}
        </select>
        <div className="TimeTable__menu__info">
          <h3>{selectedTable.name}</h3>
          <p>{selectedTable.updated_at}</p>
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
      <Schedule />
      <div className="TimeTable__button-wrapper">
        <button>새 수업 추가</button>
      </div>
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
              onChange={(e) => {
                setTableSettings({ ...tableSettings, private: e.target.value });
              }}
            />{" "}
            전체 공개
            <input
              type="radio"
              name="private"
              value="친구공개"
              onChange={(e) => {
                setTableSettings({ ...tableSettings, private: e.target.value });
              }}
            />{" "}
            친구 공개
            <input
              type="radio"
              name="private"
              value="비공개"
              onChange={(e) => {
                setTableSettings({ ...tableSettings, private: e.target.value });
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
  );
};

export default TimeTable;
