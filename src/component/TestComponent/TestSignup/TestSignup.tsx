import "./TestSignup.css";
import React, { useState } from "react";
import { AxiosResponse } from "axios";
import request from "../../../API/API";

const TestSignup = () => {
  const [signupUsername, setSignupUsername] = useState<string>("");
  const [signupPassword, setSignupPassword] = useState<string>("");
  const [signupEmail, setSignupEmail] = useState<string>("");
  const [signupNickname, setSignupNickname] = useState<string>("");
  const [signupYear, setSignupYear] = useState<string>("");
  const [signupUniv, setSignupUniv] = useState<string>("");

  interface SignupInputType {
    username: string;
    password: string;
    email: string;
    nickname: string;
    admission_year: string;
    univ: string;
  }

  const tryTestSignup = (
    usernameInput: string,
    passwordInput: string,
    emailInput: string,
    nicknameInput: string,
    admissionYearInput: string,
    univInput: string
  ) => {
    return (event: React.SyntheticEvent) => {
      event.preventDefault(); //submit 시 새로고침 방지
      request
        .post<SignupInputType, AxiosResponse>("/user/signup", {
          username: usernameInput,
          password: passwordInput,
          email: emailInput,
          nickname: nicknameInput,
          admission_year: admissionYearInput,
          univ: univInput,
        })
        .then((response: AxiosResponse) => {
          console.log(response.data);
        });
    };
  };

  return (
    <section className="SignupTest">
      <form
        className="SignupTestForm"
        onSubmit={tryTestSignup(
          signupUsername,
          signupPassword,
          signupEmail,
          signupNickname,
          signupYear,
          signupUniv
        )}
      >
        ID:
        <input
          type="text"
          value={signupUsername}
          onChange={(e) => {
            setSignupUsername(e.target.value);
          }}
        />
        패스워드:
        <input
          type="text"
          value={signupPassword}
          onChange={(e) => {
            setSignupPassword(e.target.value);
          }}
        />
        이메일:
        <input
          type="text"
          value={signupEmail}
          onChange={(e) => {
            setSignupEmail(e.target.value);
          }}
        />
        닉네임:
        <input
          type="text"
          value={signupNickname}
          onChange={(e) => {
            setSignupNickname(e.target.value);
          }}
        />
        학번:
        <input
          type="text"
          value={signupYear}
          onChange={(e) => {
            setSignupYear(e.target.value);
          }}
        />
        대학:
        <input
          type="text"
          value={signupUniv}
          onChange={(e) => {
            setSignupUniv(e.target.value);
          }}
        />
        <input
          className="SignupTestButton"
          type="submit"
          value="테스트 사인업!"
        />
      </form>
    </section>
  );
};

export default TestSignup;
