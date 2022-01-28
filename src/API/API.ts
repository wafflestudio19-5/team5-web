import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import store from "../redux/store";
import { postRefreshAPI } from "./loginAPI";
import { saveToken } from "../function/localStorage";
import { login } from "../redux/authorization";
import { useHistory } from "react-router-dom";

const URL = "https://www.waffle-minkyu.shop" as const;

//유용한 함수들
const getToken = () => {
  const storedToken = store.getState().authorization.token;
  if (storedToken === null) {
    return { access: "No Access Token", refresh: "No Refresh Token" };
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

//API 관련 함수들

//Axios 인스턴스들
export const plainRequest: AxiosInstance = axios.create({
  baseURL: URL,
});

export const authRequest: AxiosInstance = axios.create({
  baseURL: URL,
});

//인터셉터 이용하여 Axios 인스턴스에 토큰 추가
authRequest.interceptors.request.use(function (config: AxiosRequestConfig) {
  if (config?.headers) {
    config.headers["Authorization"] = `Bearer ${getToken().access}`;
    return config;
  }
});

authRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 403) {
      const data = error.response.data;
      if (data.code === "token_not_valid") {
        const originalRequest = error.config;
        console.log(getToken());
        postRefreshAPI(getToken().refresh).then((newToken) => {
          if (newToken) {
            store.dispatch(login(newToken));
            saveToken(newToken);
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newToken.access}`;
            return axios(error.config);
          }
        });
      } else if (
        data.detail === "You do not have permission to perform this action."
      ) {
        window.location.href = "verify";
      }
    }
    throw error;
  }
);

export default {};

/*
* ____request
      .post<LogInInputType, AxiosResponse<AccessTokenType>>('/login', {
        username: usernameInput,
        password: passwordInput,
      })
*  와 같이 사용하면 됩니다.
* */
