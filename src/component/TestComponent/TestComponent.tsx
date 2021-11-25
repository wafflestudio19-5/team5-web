import "./TestComponent.css";
import React, { useState } from "react";
import { AxiosResponse } from "axios";
import request from "../../API/API";

const TestComponent = () => {
  const [testUsername, setTestUsername] = useState<string>("");
  const [testPassword, setTestPassword] = useState<string>("");
  const [testResult, setTestResult] = useState<string>("");

  interface LoginInputType {
    username: string;
    password: string;
  }

  const tryTestLogin = (usernameInput: string, passwordInput: string) => {
    return (event: React.SyntheticEvent) => {
      event.preventDefault(); //submit 시 새로고침 방지
      request
        .post<LoginInputType, AxiosResponse>("/login", {
          username: usernameInput,
          password: passwordInput,
        })
        .then((response: AxiosResponse) => {
          console.log(response.data);
        });
    };
  };

  return (
    <div className="TestComponent">
      <form
        className="LoginTestForm"
        onSubmit={tryTestLogin(testUsername, testPassword)}
      >
        ID:
        <input
          type="text"
          value={testUsername}
          onChange={(e) => {
            setTestUsername(e.target.value);
          }}
        />
        패스워드:
        <input
          type="password"
          value={testPassword}
          onChange={(e) => {
            setTestPassword(e.target.value);
          }}
        />
        <input
          className="LoginTestButton"
          type="submit"
          value="테스트 로그인!"
        />
      </form>
      <div className="LoginTestResult">결과:{testResult}</div>
    </div>
  );
};

export default TestComponent;
