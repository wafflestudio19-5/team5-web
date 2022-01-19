import { useState } from "react";
import { login } from "../../../redux/authorization";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveToken } from "../../../function/localStorage";
import { LoginInputType } from "../../../interface/interface";
import { Link } from "react-router-dom";
import {
  getGoogleLoginAPI,
  getKakaoLoginAPI,
  getNaverLoginAPI,
  postLoginAPI,
} from "../../../API/loginAPI";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loginInput, setLoginInput] = useState<LoginInputType>({
    username: "",
    password: "",
  });

  const changeUsername = (input: string) => {
    setLoginInput({ ...loginInput, username: input });
  };
  const changePassword = (input: string) => {
    setLoginInput({ ...loginInput, password: input });
  };
  const tryLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const input = {
      username: loginInput.username,
      password: loginInput.password,
    };

    postLoginAPI(input).then((token) => {
      dispatch(login(token));
      saveToken(token);
      history.push("/");
    });
  };

  return (
    <div className="Login">
      <div className="LoginBox">
        <h1 className="LoginLogo" />
        <form onSubmit={tryLogin}>
          <input
            type="text"
            name="아이디"
            placeholder="아이디"
            onChange={(e) => changeUsername(e.target.value)}
            value={loginInput.username}
          />
          <input
            type="password"
            name="비밀번호"
            placeholder="비밀번호"
            onChange={(e) => changePassword(e.target.value)}
            value={loginInput.password}
          />
          <button onClick={tryLogin}>로그인</button>
        </form>

        <div className="LoginCheck">
          <label className="LoginAuto">
            <input type={"checkbox"} />
            로그인 유지
          </label>
          <p className="forgot">아이디/비밀번호 찾기</p>
        </div>
        <div className="register">
          <span>에브리타임에 처음이신가요?</span>
          <Link to={"/register"}>
            <span>회원가입</span>
          </Link>
        </div>
        <div className="Login__social">
          <button className="Login__kakao" onClick={getNaverLoginAPI}>
            네이버
          </button>
          <button className="Login__kakao" onClick={getKakaoLoginAPI}>
            카카오
          </button>
          <button className="Login__kakao" onClick={getGoogleLoginAPI}>
            구글
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
