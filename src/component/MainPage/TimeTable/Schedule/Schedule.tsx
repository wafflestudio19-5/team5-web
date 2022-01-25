const weekday = ["월", "화", "수", "목", "금"];
const classToTime = (classNo: number) => {
  if (classNo <= 0) {
    return "잘못된 교시입니다";
  } else if (classNo <= 4) {
    return `오전 ${classNo + 8}시`;
  } else if (classNo <= 15) {
    return `오후 ${classNo - 4}시`;
  } else {
    return "잘못된 교시입니다";
  }
};
const renderGrid = () => {
  const result = [];
  for (let i = 0; i < 15; i++) {
    result.push(<div className="Schedule__item">{i + 1}교시</div>);
    for (let j = 0; j < 5; j++) {
      result.push(<div className="Schedule__item" />);
    }
    result.push(<div className="Schedule__item">{classToTime(i + 1)}</div>);
  }
  return result;
};

const Schedule = () => {
  return (
    <div className="Schedule">
      <div className="Schedule__label--hider" />
      <div className="Schedule__label--container">
        <div className="Schedule__label" />
        {weekday.map((day) => (
          <div className="Schedule__label">{day}</div>
        ))}
        <div className="Schedule__label" />
      </div>
      <div className="Schedule__container">{renderGrid()}</div>
    </div>
  );
};

export default Schedule;
