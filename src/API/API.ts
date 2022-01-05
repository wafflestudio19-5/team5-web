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

export const makeQuery = (queryObject: object) => {
  let query = "?";
  for (const [key, value] of Object.entries(queryObject)) {
    query += `${key}=${value}&`;
  }
  query = query.slice(0, -1); // query가 비어있을 때의 ?나 key=value 마지막의 &을 삭제합니다
  return query;
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
