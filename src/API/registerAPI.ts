import {
  RegisterInputType,
  SocialRegisterInputType,
} from "../interface/interface";
import { plainRequest } from "./API";

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
