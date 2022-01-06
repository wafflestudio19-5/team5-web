import { authRequest, makeQuery } from "./API";
import { getErrorData } from "./ErrorHandling";
import { postInputType } from "../interface/interface";
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
    console.log("게시글 리스트 불러오기 실패!"); //테스트용
    return [];
  }
};

export const getPostWithURLAPI = async (URL: string) => {
  try {
    const response = await authRequest.get(URL);
    return response.data;
  } catch (e) {
    console.log("게시글 리스트 불러오기 실패!"); //테스트용
    return [];
  }
};

export const postPostAPI = async (board: number, input: postInputType) => {
  try {
    const response = await authRequest.post(
      `/post/${makeQuery({ board: board })}`,
      input
    );
    return response.data;
  } catch (e) {
    console.log("게시글 업로드 실패!"); //테스트용
    return e;
  }
};


