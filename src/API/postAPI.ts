import { authRequest, makeQuery } from "./API";

export const getPostAPI = async (
  board: number | string,
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

export const postPostAPI = async (board: number, input: FormData) => {
  try {
    console.log(input);
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

export const postEditAPI = async (input: FormData, postId: string) => {
  try {
    const response = await authRequest.put(`/post/${postId}/`, input);
    return response.data;
  } catch (e) {
    console.log(e); //테스트용
    return e;
  }
};

export const postDeleteAPI = async (postId: string) => {
  try {
    const response = await authRequest.delete(`/post/${postId}/`);
    return response.data;
  } catch (e) {
    console.log(e); //테스트용
    return e;
  }
};

export const searchPostAPI = async (
  query: string,
  offset: number = 0,
  limit: number = 10
) => {
  try {
    const response = await authRequest.get(
      `/post/search/${makeQuery({
        query: query,
        limit: limit,
        offset: offset,
      })}`
    );
    return response.data;
  } catch (e) {
    console.log("게시글 검색 실패!"); //테스트용
    console.log(e);
  }
};

export const getLiveTopAPI = async () => {
  try {
    const response = await authRequest.get(`/post/livetop`);
    return response.data;
  } catch (e) {
    console.log("실시간 인기 글 불러오기 실패!"); //테스트용
    return [];
  }
};
