import { plainRequest } from "./API";
import { LoginInputType, TokenType } from "../interface/interface";
import { toast } from "../component/Toast/ToastManager";
import { AxiosErrorType, getErrorData } from "./errorHandling";

export const postLoginAPI = async (input: LoginInputType) => {
  try {
    const response = await plainRequest.post("/user/login/", input);
    return response.data.token;
  } catch (e) {
    const error = e as AxiosErrorType;
    if (error) {
      toast.show({
        title: `${error.response.status}`,
        content: `${error.response.data.non_field_errors}`,
        duration: 3000,
      });
    }
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
  } catch {
    console.log("refresh failed!");
  }
};

export const getNaverLoginAPI = () => {
  window.location.href = "https://waffle-minkyu.shop/user/naver/login/";
};
export const getKakaoLoginAPI = () => {
  window.location.href = "https://waffle-minkyu.shop/user/naver/login/";
};
export const getGoogleLoginAPI = () => {
  window.location.href = "https://waffle-minkyu.shop/user/naver/login/";
};

export const sendAuthCodeAPI = async (
  platform: string,
  code: any,
  state?: any
) => {
  if (state) {
    const response = await plainRequest.post(
      `user/${platform}/login/callback`,
      {
        code: code,
        state: state,
      }
    );
    return response;
  } else {
    const response = await plainRequest.post(
      `user/${platform}/login/callback`,
      {
        code: code,
      }
    );
    return response;
  }
};
