import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import store from "../redux/store";

const URL = "https://www.waffle-minkyu.shop" as const;

const getToken = () => {
  const storedToken = store.getState().authorization.token;
  if (storedToken === null) {
    return "No Token";
  } else {
    return storedToken;
  }
};

export const plainRequest: AxiosInstance = axios.create({
  baseURL: URL,
});

export const authRequest: AxiosInstance = axios.create({
  baseURL: URL,
});

authRequest.interceptors.request.use(function (config: AxiosRequestConfig) {
  if (config?.headers) {
    config.headers["Authorization"] = `JWT ${getToken()}`;
    return config;
  }
});

export default {};

/*
* ____request
      .post<LogInInputType, AxiosResponse<AccessTokenType>>('/login', {
        username: usernameInput,
        password: passwordInput,
      })
*  와 같이 사용하면 됩니다.
* */
