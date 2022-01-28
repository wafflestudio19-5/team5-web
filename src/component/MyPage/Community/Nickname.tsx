import { useEffect, useState } from "react";
import { getMyProfileAPI, patchMyProfileAPI } from "../../../API/userAPI";
import { UserPatchType } from "../../../interface/interface";

const Email = () => {
  const [nickname, setNickname] = useState<string>("");

  const changeNickname = () => {
    const form = new FormData();
    form.append("nickname", nickname);
    patchMyProfileAPI(form).then((res) => {});
  };

  const getCurrentNickname = () => {
    getMyProfileAPI().then((res) => {
      setNickname(res.nickname);
    });
  };
  useEffect(() => {
    getCurrentNickname();
  }, []);

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
            value={nickname}
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
