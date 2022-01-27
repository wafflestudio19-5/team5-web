import { LectureScheduleType } from "../../../../interface/interface";
import { convertTimeToStyle } from "../../../../function/lecture";
import { deleteTimeTableLecture } from "../../../../API/timetableAPI";

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

const renderLecture = (
  lecture: LectureScheduleType,
  start: number,
  end: number,
  location: string,
  index: number
) => {
  return (
    <div
      className="Schedule__lecture-item"
      style={{ ...convertTimeToStyle(start, end, index) }}
    >
      <p className="title">{lecture.title}</p>
      <p>
        {lecture.instructor} {location}
      </p>
      <button />
    </div>
  );
};

const renderLectures = (lectureArray: LectureScheduleType[]) => {
  const mon = [<div />];
  const tue = [<div />];
  const wed = [<div />];
  const thu = [<div />];
  const fri = [<div />];
  lectureArray.forEach((lecture, lectureIndex) => {
    lecture.lecture_time.forEach((time) => {
      switch (time.day) {
        case "월":
          mon.push(
            renderLecture(
              lecture,
              time.start,
              time.end,
              time.location,
              lectureIndex
            )
          );
          break;
        case "화":
          tue.push(
            renderLecture(
              lecture,
              time.start,
              time.end,
              time.location,
              lectureIndex
            )
          );
          break;
        case "수":
          wed.push(
            renderLecture(
              lecture,
              time.start,
              time.end,
              time.location,
              lectureIndex
            )
          );
          break;
        case "목":
          thu.push(
            renderLecture(
              lecture,
              time.start,
              time.end,
              time.location,
              lectureIndex
            )
          );
          break;
        case "금":
          fri.push(
            renderLecture(
              lecture,
              time.start,
              time.end,
              time.location,
              lectureIndex
            )
          );
          break;
      }
    });
  });
  return (
    <>
      <div className="Schedule__lecture-row">{mon}</div>
      <div className="Schedule__lecture-row">{tue}</div>
      <div className="Schedule__lecture-row">{wed}</div>
      <div className="Schedule__lecture-row">{thu}</div>
      <div className="Schedule__lecture-row">{fri}</div>)
    </>
  );
};

const Schedule = ({
  lectures,
  deleteLectureFromTable,
}: {
  lectures: LectureScheduleType[] | undefined;
  deleteLectureFromTable: Function;
}) => {
  const renderLecture = (
    lecture: LectureScheduleType,
    start: number,
    end: number,
    location: string,
    index: number
  ) => {
    return (
      <div
        className="Schedule__lecture-item"
        style={{ ...convertTimeToStyle(start, end, index) }}
      >
        <p className="title">{lecture.title}</p>
        <p>
          {lecture.instructor} {location}
        </p>
        <button
          onClick={() => {
            deleteLectureFromTable(lecture.id);
          }}
        />
      </div>
    );
  };

  const renderLectures = (lectureArray: LectureScheduleType[]) => {
    const mon = [<div />];
    const tue = [<div />];
    const wed = [<div />];
    const thu = [<div />];
    const fri = [<div />];
    lectureArray.forEach((lecture, lectureIndex) => {
      lecture.lecture_time.forEach((time) => {
        switch (time.day) {
          case "월":
            mon.push(
              renderLecture(
                lecture,
                time.start,
                time.end,
                time.location,
                lectureIndex
              )
            );
            break;
          case "화":
            tue.push(
              renderLecture(
                lecture,
                time.start,
                time.end,
                time.location,
                lectureIndex
              )
            );
            break;
          case "수":
            wed.push(
              renderLecture(
                lecture,
                time.start,
                time.end,
                time.location,
                lectureIndex
              )
            );
            break;
          case "목":
            thu.push(
              renderLecture(
                lecture,
                time.start,
                time.end,
                time.location,
                lectureIndex
              )
            );
            break;
          case "금":
            fri.push(
              renderLecture(
                lecture,
                time.start,
                time.end,
                time.location,
                lectureIndex
              )
            );
            break;
        }
      });
    });
    return (
      <>
        <div className="Schedule__lecture-row">{mon}</div>
        <div className="Schedule__lecture-row">{tue}</div>
        <div className="Schedule__lecture-row">{wed}</div>
        <div className="Schedule__lecture-row">{thu}</div>
        <div className="Schedule__lecture-row">{fri}</div>
      </>
    );
  };

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
      <div className="Schedule__wrapper">
        <div className="Schedule__background-container">{renderGrid()}</div>
        <div className="Schedule__lecture-container">
          <div />
          {lectures && renderLectures(lectures)}
          <div />
        </div>
      </div>
    </div>
  );
};

export default Schedule;
