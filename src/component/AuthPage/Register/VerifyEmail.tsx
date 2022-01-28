import { useState } from "react";
import { postSchoolMailAPI } from "../../../API/registerAPI";
import { deleteToken } from "../../../function/localStorage";
import { logout } from "../../../redux/authorization";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toastErrorData } from "../../../API/errorHandling";

const VerifyEmail = () => {
  const [email, setEmail] = useState<string>("");
  const dispatch = useDispatch();
  const history = useHistory();
  const verify = () => {
    if (email.includes("@") && !email.includes("@snu.ac.kr")) {
      window.alert("서울대학교 메일이 아닙니다.");
    } else {
      if (
        window.confirm(
          `${
            email.includes("@snu.ac.kr") ? email : email + "@snu.ac.kr"
          } 주소가 맞습니까?`
        )
      ) {
        if (email.includes("@snu.ac.kr")) {
          const form = new FormData();
          form.append("email", email);
          postSchoolMailAPI(form).then((res) => {
            window.alert(`${email} 계정으로 인증 메일이 전송되었습니다.`);
          });
        } else {
          const form = new FormData();
          form.append("email", email + "@snu.ac.kr");
          postSchoolMailAPI(form).then(
            (res) => {
              window.alert(
                `${email + "@snu.ac.kr"} 계정으로 인증 메일이 전송되었습니다.`
              );
            },
            (error) => {
              if (error.response) {
                toastErrorData(error.response.data);
              }
            }
          );
        }
      }
    }
  };

  const tryLogOut = () => {
    deleteToken();
    dispatch(logout());
    history.push("/");
  };

  return (
    <div className="MyPageMain">
      <section>
        <div className={"title"}>
          <h2>서울대학교 메일 인증</h2>
          <button onClick={tryLogOut}>로그아웃</button>
        </div>
        <p>
          서울대학교 이메일 인증이 필요합니다 <br />
          이메일 인증이 완료되면 서비스를 이용하실 수 있습니다
        </p>
        <input
          className={"emailInput"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={"서울대 계정 이메일 "}
        />
        <span className={"suffix"}>@snu.ac.kr</span>
        <button onClick={verify}>이메일 인증</button>
        <button onClick={() => history.push("/")} className={"confirm"}>
          인증 완료
        </button>
      </section>
    </div>
  );
};

export default VerifyEmail;
