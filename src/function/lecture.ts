import { LectureTimeType } from "../interface/interface";

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
