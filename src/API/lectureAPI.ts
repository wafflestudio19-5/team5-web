import { TimeTableSearchQueryType } from "../interface/interface";
import { authRequest } from "./API";
import { makeQuery } from "./API";

export const getSearchedLecture = async (
  searchQuery: TimeTableSearchQueryType
) => {
  try {
    const response = await authRequest.get(
      `/lecture/table/search/${makeQuery(searchQuery)}`
    );
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};
