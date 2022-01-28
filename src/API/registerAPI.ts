import {
  EmailVerifyType,
  RegisterInputType,
  SocialRegisterInputType,
} from "../interface/interface";
import { authRequest, plainRequest } from "./API";

export const postSignupAPI = async (input: RegisterInputType) => {
  try {
    const response = await plainRequest.post("/user/signup/", input);
    return response.data.token;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const postSocialSignupAPI = async (input: SocialRegisterInputType) => {
  try {
    const response = await plainRequest.post("/user/social/signup/", input);
    return response.data.token;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const postSchoolMainAPI = async (input: EmailVerifyType) => {
  try {
    const response = await authRequest.post("/user/verify/send", input);
    return response.data;
  } catch (e) {
    return Promise.reject(e);
  }
};
