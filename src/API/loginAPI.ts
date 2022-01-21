import { plainRequest } from "./API";
import { LoginInputType, TokenType } from "../interface/interface";

export const postLoginAPI = async (input: LoginInputType) => {
  try {
    const response = await plainRequest.post("/user/login/", input);
    return response.data.token;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const postRefreshAPI = async (refreshToken: string | null) => {
  try {
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
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getNaverLoginAPI = () => {
  window.location.href = "https://waffle-minkyu.shop/user/naver/login/";
};
export const getKakaoLoginAPI = () => {
  window.location.href = "https://waffle-minkyu.shop/user/kakao/login/";
};
export const getGoogleLoginAPI = () => {
  window.location.href = "https://waffle-minkyu.shop/user/google/login/";
};

export const sendAuthCodeAPI = async (
  platform: string,
  code: string | null | undefined,
  state?: string | null | undefined
) => {
  try {
    if (state) {
      const response = await plainRequest.post(
        `user/${platform}/login/callback/`,
        {
          code: code,
          state: state,
        }
      );
      return response.data;
    } else {
      const response = await plainRequest.post(
        `user/${platform}/login/callback/`,
        {
          code: code,
        }
      );
      return response.data;
    }
  } catch (e) {
    return Promise.reject(e);
  }
};
