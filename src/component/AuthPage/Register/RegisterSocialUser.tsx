import {
  RegisterInputType,
  SocialRegisterInputType,
} from "../../../interface/interface";
import { useState } from "react";

type RegisterProps = {
  changeSocialRegisterInput: Function;
  socialRegisterInput: SocialRegisterInputType;
  disableEmail: boolean;
};

const yearList = [
  "10학번",
  "11학번",
  "12학번",
  "13학번",
  "14학번",
  "15학번",
  "16학번",
  "17학번",
  "18학번",
  "19학번",
  "20학번",
  "21학번",
  "22학번",
  "그 외 학번",
  "졸업생",
] as const;

const RegisterUser = ({
  changeSocialRegisterInput,
  socialRegisterInput,
  disableEmail,
}: RegisterProps) => {
  return (
    <>
      <div className="Register__Text">
        <h2>에브리타임 회원 가입</h2>
        <p>
          에브리타임 계정으로 캠퍼스픽, 에브리타임 등 <br />
          다양한 대학생 서비스를 모두 이용하실 수 있습니다
        </p>
      </div>
      <div className="Register__Input">
        <div className="Register__Label">입학년도</div>
        <select
          value={socialRegisterInput.admission_year}
          onChange={(e) => {
            changeSocialRegisterInput("admission_year", e.target.value);
          }}
        >
          <option key="없음" value="">
            연도 선택(학번)
          </option>
          {yearList.map((yearString) => {
            return (
              <option key={`${yearString}`} value={`${yearString}`}>
                {yearString}
              </option>
            );
          })}
        </select>
      </div>
      <div className="Register__Input">
        <div className="Register__Label">학교</div>
        <select
          value={socialRegisterInput.univ}
          onChange={(e) => {
            changeSocialRegisterInput("univ", e.target.value);
          }}
        >
          <option value="">학교 선택</option>
          <option value="서울대학교">서울대학교</option>
        </select>
      </div>
      <div className="Register__Input">
        <div className="Register__Label">이름</div>
        <input
          type="text"
          className="Register__nickname"
          value={socialRegisterInput.nickname}
          onChange={(e) => {
            changeSocialRegisterInput("nickname", e.target.value);
          }}
        />
      </div>
      <div className="Register__Input">
        <div className="Register__Label">이메일</div>
        <input
          type="text"
          className="Register__email"
          value={socialRegisterInput.email}
          onChange={(e) => {
            changeSocialRegisterInput("email", e.target.value);
          }}
          disabled={disableEmail}
        />
      </div>
      <input type="submit" value="다음" />
    </>
  );
};

export default RegisterUser;
