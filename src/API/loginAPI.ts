import { authRequest, plainRequest } from "./API";
import { LoginInputType, TokenType } from "../interface/interface";

export const postLoginAPI = async (input: LoginInputType) => {
  try {
    const response = await plainRequest.post("/user/login/", input);
    return response.data.token;
  } catch (e) {
    console.log(e);
  }
};

export const postRefreshAPI = async (refreshToken: string | null) => {
  try {
    console.log(refreshToken);
    const response = await plainRequest.post("/token/refresh/", {
      refresh: refreshToken,
    });
    if (response.data.access) {
      return {
        access: response.data.access,
        refresh: refreshToken,
      } as TokenType;
    } else {
      throw "error";
    }
  } catch {
    console.log("refresh failed!");
  }
};
