import { useEffect, useState } from "react";
import { patchMyProfileAPI, postDeleteUserAPI } from "../../../API/userAPI";
import { useHistory } from "react-router-dom";
import { deleteToken } from "../../../function/localStorage";
import { logout } from "../../../redux/authorization";
import { useDispatch } from "react-redux";
import { toastErrorData } from "../../../API/errorHandling";

const Withdrawal = () => {
  const [password, setPassword] = useState<string>("");
  const history = useHistory();
  const dispatch = useDispatch();
  const withdrawal = () => {
    const form = new FormData();
    form.append("password", password);
    postDeleteUserAPI(form).then(
      (res) => {
        deleteToken();
        dispatch(logout());
        history.push("/");
      },
      (error) => {
        if (error.response) {
          toastErrorData(error.response.data);
        }
      }
    );
  };

  return (
    <div className={"MyPageMain"}>
      <section>
        <h2>회원 탈퇴</h2>
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
          <strong>
            ※ 탈퇴 및 가입을 반복할 경우, 서비스 악용 방지를 위해 재가입이
            제한됩니다. 최초 탈퇴 시에는 가입 시점을 기준으로 1일간 제한되며,
            2회 이상 탈퇴를 반복할 경우 30일간 제한됩니다.
          </strong>{" "}
          <br />
          <strong>
            ※ 탈퇴 후 개인 정보, 시간표 등의 데이터가 삭제되며, 복구할 수
            없습니다.
          </strong>{" "}
        </div>
        <button className={"changePWButton"} onClick={withdrawal}>
          회원 탈퇴
        </button>
      </section>
    </div>
  );
};

export default Withdrawal;
