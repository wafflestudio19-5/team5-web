import { authRequest, makeQuery } from "./API";

import { postInputType } from "../interface/interface";
export const getPostDetailAPI = async (postID: number) => {
  try {
    const response = await authRequest.get(`/post/${postID}`);
    return response.data;
  } catch (e) {
    console.log("게시글 리스트 불러오기 실패!"); //테스트용
    return [];
  }
};
