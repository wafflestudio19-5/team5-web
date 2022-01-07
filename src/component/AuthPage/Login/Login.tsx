import { useState } from "react";
import { login } from "../../../redux/authorization";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveToken } from "../../../function/localStorage";
import { LoginInputType } from "../../../interface/interface";
import { postLoginAPI } from "../../../API/loginAPI";

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
  const tryLogin = (input: LoginInputType) => {
    postLoginAPI(loginInput).then((token) => {
      dispatch(login(token));
      saveToken(token);
      history.push("/");
    });
  };

  return (
    <div className="Login">
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
      <button
        onClick={() => {
          tryLogin(loginInput);
        }}
      >
        로그인
      </button>
    </div>
  );
};

export default Login;
