import { LectureScheduleType, LectureTimeType } from "../interface/interface";

export const convertTimeToString = (lectureTime: LectureTimeType[]) => {
  let result = "";
  lectureTime.forEach((item) => {
    result =
      result +
      `${item.day}(${String(item.start).slice(0, -2)}:${String(
        item.start
      ).slice(-2)}~${String(item.end).slice(0, -2)}:${String(item.end).slice(
        -2
      )})/`;
  });
  result = result.slice(0, -1);
  return result;
};
export const convertLocationToString = (lectureTime: LectureTimeType[]) => {
  let result = "";
  lectureTime.forEach((item) => {
    result = result + `${item.location}/`;
  });
  result = result.slice(0, -1);
  return result;
};

const timeToHeight = (time: number) => {
  const hour = Math.floor(time / 100) - 9;
  const min = time % 100;
  return hour * 60 + min;
};
const selectColor = [
  "#e599f7",
  "#ffc9c9",
  "#ffec99",
  "#d8f5a2",
  "#66d9e8",
  "#74c0fc",
  "#b197fc",
  "#fcc2d7",
  "#ffd8a8",
  "#faa2c1",
];
export const convertTimeToStyle = (
  start: number,
  end: number,
  index: number
) => {
  console.log(start);
  console.log(timeToHeight(start));
  const style = {
    top: `${timeToHeight(start)}px`,
    height: `${timeToHeight(end) - timeToHeight(start)}px`,
    background: `${selectColor[index % 10]}`,
  };
  return style;
};

export const calculateCredit = (
  lectures: LectureScheduleType[] | undefined
) => {
  let result = 0;
  if (lectures) {
    lectures.forEach((lecture) => {
      result = result + lecture.credits;
    });
  }
  return result;
};
