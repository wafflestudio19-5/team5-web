import { Link } from "react-router-dom";

const LoginAndRegister = () => {
  return (
    <div className="LoginAndRegister">
      <Link to="/login" className="LoginAndRegister__LoginButton">
        로그인
      </Link>
      <Link to="/register" className="LoginAndRegister__RegisterButton">
        에브리타임 회원가입
      </Link>
    </div>
  );
};

export default LoginAndRegister;
