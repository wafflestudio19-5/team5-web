import { authRequest, makeQuery } from "./API";
import { TimeTableSettingsType } from "../interface/interface";

export const getTimeTableBySemester = async (inputSemester: string) => {
  try {
    const response = await authRequest.get(
      `/timetable/${makeQuery({ semester: inputSemester })}`
    );
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getTimeTableById = async (inputId: string) => {
  try {
    const response = await authRequest.get(`/timetable/${inputId}`);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const postTimeTable = async (inputSemester: string) => {
  try {
    const response = await authRequest.post(`/timetable/`, {
      semester: inputSemester,
    });
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const putTimeTable = async (
  inputId: string,
  inputSettings: TimeTableSettingsType
) => {
  try {
    const response = await authRequest.put(
      `/timetable/${inputId}/`,
      inputSettings
    );
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const deleteTimeTable = async (inputId: string) => {
  try {
    const response = await authRequest.delete(`/timetable/${inputId}/`);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const postTimeTableLecture = async (
  timeTableId: number,
  lectureId: number
) => {
  try {
    const response = await authRequest.post(
      `/timetable/${timeTableId}/lecture/${lectureId}/`
    );
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};
export const deleteTimeTableLecture = async (
  timeTableId: number,
  lectureId: number
) => {
  try {
    const response = await authRequest.delete(
      `/timetable/${timeTableId}/lecture/${lectureId}/`
    );
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};
