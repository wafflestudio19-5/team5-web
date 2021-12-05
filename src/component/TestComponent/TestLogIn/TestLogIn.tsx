import "./TestLogIn.css";
import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import request from "../../../API/API";

const TestLogIn = () => {
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
      // request
      axios
        .post<LoginInputType, AxiosResponse>("/user/login/", {
          username: usernameInput,
          password: passwordInput,
        })
        .then((response: AxiosResponse) => {
          console.log(response.data);
        });
    };
  };

  return (
    <section className="LoginTest">
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
    </section>
  );
};

export default TestLogIn;
