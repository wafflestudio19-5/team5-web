import { useEffect, useState } from "react";

const Email = () => {
  const [nickname, setNickname] = useState<string>("");

  const changeNickname = () => {
    window.alert("아직 구현되지 않은 기능입니다.");
  };

  return (
    <div className={"MyPageMain"}>
      <section>
        <h2>닉네임 설정</h2>
        <div className="passwordInput">
          <div className="label">
            <label> 닉네임 </label>
          </div>
          <input
            placeholder="닉네임"
            type={"password"}
            onChange={(e) => {
              setNickname(e.target.value);
            }}
          />
        </div>

        <div className={"rules"}>
          <strong>※ 닉네임을 설정하면</strong>
          <span> 10분동안 변경할 수 없습니다.</span>
        </div>
        <button className={"changePWButton"} onClick={changeNickname}>
          닉네임 설정
        </button>
      </section>
    </div>
  );
};

export default Email;
