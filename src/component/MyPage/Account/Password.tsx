import { useEffect, useState } from "react";
import { patchMyProfileAPI } from "../../../API/userAPI";
import { toastErrorData } from "../../../API/errorHandling";
import { useHistory } from "react-router-dom";

const Password = () => {
  const history = useHistory();
  const [newPassword, setNewPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLongEnough, setLongEnough] = useState<boolean>(true);
  const [isPasswordSame, setPasswordSame] = useState<boolean>(true);
  const changePassword = () => {
    if (!isPasswordSame) {
      window.alert("비밀번호가 일치하지 않습니다.");
    } else if (!isLongEnough || newPassword.length === 0) {
      window.alert("비밀번호는 8~20자만 가능합니다.");
    } else {
      const form = new FormData();
      form.append("origin_password", password);
      form.append("new_password2", passwordCheck);
      form.append("new_password1", newPassword);
      patchMyProfileAPI(form).then(
        (res) => {
          window.alert("비밀번호가 변경되었습니다.");
          history.push("/");
        },
        (error) => {
          if (error.response) {
            toastErrorData(error.response.data);
          }
        }
      );
    }
  };

  const checkValidPW = () => {
    if (newPassword.length > 0 && newPassword.length < 8) {
      setLongEnough(false);
    } else {
      setLongEnough(true);
    }
    if (newPassword !== passwordCheck && passwordCheck.length !== 0) {
      setPasswordSame(false);
    } else {
      setPasswordSame(true);
    }
  };

  useEffect(checkValidPW, [newPassword, passwordCheck, password]);

  return (
    <div className={"MyPageMain"}>
      <section>
        <h2>비밀번호 변경</h2>
        <div className="passwordInput">
          <div className="label">
            <label> 새 비밀번호 </label>
            <p>영문, 숫자, 특문이 2종류 이상 조합된 8~20자</p>
          </div>
          <input
            placeholder="새 비밀번호"
            type={"password"}
            maxLength={20}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            className={isLongEnough ? "inputOK" : "inputError"}
          />

          {isLongEnough ? <div /> : <span>8자 이상 입력하세요</span>}

          <input
            placeholder="새 비밀번호 확인"
            type={"password"}
            maxLength={20}
            onChange={(e) => {
              setPasswordCheck(e.target.value);
            }}
            className={isPasswordSame ? "inputOK" : "inputError"}
          />
          {isPasswordSame ? <div /> : <span>비밀번호가 일치하지 않습니다</span>}
        </div>

        <div className="passwordInput">
          <div className="label">
            <label> 현재 비밀번호 </label>
          </div>
          <input
            placeholder="현재 비밀번호"
            type={"password"}
            maxLength={20}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <div className={"rules"}>
          <strong>※ 혹시 타인에게 계정을 양도하려고 하시나요?</strong> <br />
          모니터링 시스템에 의해 계정 양도가 적발될 경우 해당 계정은 영구 정지,
          탈퇴 등의 조치가 가해지며, 계정 양도로 인해 사기, 불법 행위가 발생할
          경우 관련법에 따라
          <span className={"caution"}>법적 책임을 지게 될 수 있습니다.</span>
        </div>

        <div className={"rules"}>
          <strong>※ 타인에 의한 계정 사용이 의심되시나요?</strong> <br />
          개인정보 보호를 위해 비밀번호를 변경하여 주시기 바랍니다. 비밀번호를
          변경하면
          <span className={"caution"}>
            모든 디바이스(앱, 브라우저 등)에서 즉시 로그아웃 처리됩니다.
          </span>
        </div>

        <button className={"changePWButton"} onClick={changePassword}>
          비밀번호 변경
        </button>
      </section>
    </div>
  );
};

export default Password;
