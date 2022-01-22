import { useEffect, useState } from "react";

const Email = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const changeEmail = () => {
    window.alert("아직 구현되지 않은 기능입니다.");
  };

  return (
    <div className={"MyPageMain"}>
      <section>
        <h2>이메일 변경</h2>
        <div className="passwordInput">
          <div className="label">
            <label> 이메일 </label>
          </div>
          <input
            placeholder="이메일"
            type={"password"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="passwordInput">
          <div className="label">
            <label> 계정 비밀번호 </label>
          </div>
          <input
            placeholder="계정 비밀번호"
            type={"password"}
            maxLength={20}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className={"rules"}>
          <strong>※ 반드시 본인의 이메일을 입력해주세요.</strong> <br />
          <strong>
            ※ 계정 분실 시 아이디/비밀번호 찾기, 개인정보 관련 주요 고지사항
            등에 활용됩니다.
          </strong>{" "}
        </div>
        <button className={"changePWButton"} onClick={changeEmail}>
          이메일 변경
        </button>
      </section>
    </div>
  );
};

export default Email;
