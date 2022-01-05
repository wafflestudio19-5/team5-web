import axios, { AxiosInstance } from "axios";
import store from "../redux/store";

const URL = "https://www.waffle-minkyu.shop" as const;

const token = () => {
  const storedToken = store.getState().authorization.token;
  if (storedToken) {
    return storedToken;
  } else {
    return "NO Token";
  }
};

export const plainRequest: AxiosInstance = axios.create({
  baseURL: URL,
});

export const authRequest: AxiosInstance = axios.create({
  baseURL: URL,
  headers: { Authorization: token() },
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
