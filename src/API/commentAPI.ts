import { authRequest } from "./API";

export const getCommentAPI = async (postID: number) => {
  try {
    const response = await authRequest.get(`/post/${postID}/comment/`);
    return response.data;
  } catch (e) {
    console.log("댓글 불러오기 실패!"); //테스트용
    return [];
  }
};
