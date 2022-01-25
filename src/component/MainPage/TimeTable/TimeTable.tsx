import Schedule from "./Schedule/Schedule";
import { useState } from "react";
import { useParams } from "react-router-dom";

interface TimeTableParams {
  year: string;
  season: string;
  scheduleId: string;
}

const TimeTable = () => {
  const params: TimeTableParams = useParams();
  console.log(params);

  const [selectedTable, setSelectedTable] = useState<number>(1);

  return (
    <div className="TimeTable__container">
      <div className="TimeTable__menu-wrapper">
        <select className="TimeTable__menu__select"></select>
        <div className="TimeTable__menu__info"></div>
        <ul className="TimeTable__menu__list">
          <li key="sample" className={`TimeTable__menu__item`}>
            시간표 1
          </li>
          <li key="sample2" className={`TimeTable__menu__item selected`}>
            시간표 2
          </li>
        </ul>
      </div>
      <Schedule />
      <div className="TimeTable__button-wrapper">
        <button>새 수업 추가</button>
      </div>
    </div>
  );
};

export default TimeTable;
