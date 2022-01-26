import { authRequest, makeQuery } from "./API";
import { UserPatchType } from "../interface/interface";

export const getMyProfileAPI = async () => {
  try {
    const response = await authRequest.get(`user/myprofile/`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const patchMyProfileAPI = async (input: FormData) => {
  try {
    const response = await authRequest.patch(`user/myprofile/`, input);
    console.log(response.data);
    window.alert("성공적으로 변경되었습니다.");
    return response.data;
  } catch (e) {
    window.alert("변경에 실패하였습니다. - " + e);
  }
};

export const postDeleteUserAPI = async (input: FormData) => {
  try {
    const response = await authRequest.post("user/deactivate/", input);
    window.alert("성공적으로 탈퇴되었습니다.");
    return response.data;
  } catch (e) {
    window.alert("탈퇴에 실패하였습니다.");
  }
};
