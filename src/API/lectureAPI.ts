import {
  NewEvalType,
  newLectureRequestType,
  NewTestType,
  TimeTableSearchQueryType,
} from "../interface/interface";
import { authRequest } from "./API";
import { makeQuery } from "./API";

export const getSearchedLecture = async (
  next: string,
  searchQuery: TimeTableSearchQueryType
) => {
  try {
    const response = await authRequest.get(
      `/lecture/table/search/${makeQuery(searchQuery)}${next}`
    );
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getRecentLecture = async (next?: string) => {
  try {
    if (next) {
      const response = await authRequest.get(`/lecture/recent/?${next}`);
      return response.data;
    } else {
      const response = await authRequest.get(`/lecture/recent/`);
      return response.data;
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getMyLecture = async () => {
  try {
    const response = await authRequest.get("/lecture/mine/");
    return response.data;
  } catch (e) {
    Promise.reject(e);
  }
};

export const postSearchLecture = async (searchValue: string) => {
  try {
    const response = await authRequest.post("/lecture/search/", {
      search: searchValue,
    });
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const postCustomLecture = async (
  id: number,
  input: newLectureRequestType
) => {
  try {
    const response = await authRequest.post(`/timetable/${id}/lecture/`, input);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getLectureInformation = async (id: string) => {
  try {
    const response = await authRequest.get(`/lecture/${id}/`);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getLectureSummary = async (id: string) => {
  try {
    const response = await authRequest.get(`/lecture/${id}/summary/`);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getLectureEval = async (id: string) => {
  try {
    const response = await authRequest.get(`/lecture/${id}/eval/`);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getLectureTest = async (id: string) => {
  try {
    const response = await authRequest.get(`/lecture/${id}/examinfo/`);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getMyPoint = async () => {
  try {
    const response = await authRequest.get("/lecture/mypoint/");
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const postTestPoint = async (lectureId: number, testId: number) => {
  try {
    const response = await authRequest.post(
      `/lecture/${lectureId}/examinfo/${testId}/point/`
    );
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const postEvalLike = async (lectureId: number, evalId: number) => {
  try {
    const response = await authRequest.post(
      `/lecture/${lectureId}/eval/${evalId}/like/`
    );
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const postTestLike = async (lectureId: number, testId: number) => {
  try {
    const response = await authRequest.post(
      `/lecture/${lectureId}/examinfo/${testId}/like/`
    );
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const postNewEval = async (lectureId: number, input: NewEvalType) => {
  try {
    const response = await authRequest.post(
      `/lecture/${lectureId}/eval/`,
      input
    );
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const postNewTest = async (lectureId: number, input: NewTestType) => {
  try {
    const response = await authRequest.post(
      `/lecture/${lectureId}/examinfo/`,
      input
    );
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};
