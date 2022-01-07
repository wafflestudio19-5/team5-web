import { authRequest, plainRequest } from "./API";
import { LoginInputType } from "../interface/interface";

export const postLoginAPI = async (input: LoginInputType) => {
  try {
    const response = await plainRequest.post("/user/login/", input);
    return response.data.token;
  } catch (e) {
    console.log(e);
  }
};
