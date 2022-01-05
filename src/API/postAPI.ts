import { authRequest, makeQuery } from "./API";
import { getErrorData } from "./ErrorHandling";
export const getPostAPI = async (
  board: number,
  offset: number = 0,
  limit: number = 10
) => {
  try {
    const response = await authRequest.get(
      `/post/${makeQuery({ board: board, limit: limit, offset: offset })}`
    );
    return response.data;
  } catch (e) {
    console.log(getErrorData(e));
    return [];
  }
};
