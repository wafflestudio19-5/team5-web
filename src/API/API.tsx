import axios, { AxiosInstance } from "axios";

//axios 를 간단하게 해주는 request.
const request: AxiosInstance = axios.create({
  baseURL: "https://www.waffle-minkyu.shop",
});
/*
* request
      .post<LogInInputType, AxiosResponse<AccessTokenType>>('/login', {
        username: usernameInput,
        password: passwordInput,
      })
*  와 같이 사용하면 됩니다.
* */

export default request;
