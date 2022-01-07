import { authRequest, makeQuery } from "./API";
import exp from "constants";
import { CommentInputType } from "../interface/interface";

export const getCommentAPI = async (postID: number) => {
  try {
    const response = await authRequest.get(`/post/${postID}/comment/`);
    return response.data;
  } catch (e) {
    console.log("댓글 불러오기 실패!"); //테스트용
    return [];
  }
};

export const postCommentAPI = async (postID: number, input: FormData) => {
  try {
    const response = await authRequest.post(`/post/${postID}/comment/`, input);
    return response.data;
  } catch (e) {
    console.log("댓글 달기 실패!"); //테스트용
    return e;
  }
};

export const postCommentVoteAPI = async (commentID: number) => {
  try {
    const response = await authRequest.post(`/comment/${commentID}/like/`);
    return response.data;
  } catch (e) {
    console.log("댓글 좋아요 실패!");
    return e;
  }
};

export const deleteCommentAPI = async (postID: number, commentID: number) => {
  try {
    const response = await authRequest.delete(
      `/post/${postID}/comment/${commentID}/`
    );
    return response.data;
  } catch (e) {
    console.log("댓글 삭제 실패!");
    return e;
  }
};
