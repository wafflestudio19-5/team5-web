import { TimeTableSearchQueryType } from "../interface/interface";
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
