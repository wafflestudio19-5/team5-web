import { RegisterInputType } from "../../../interface/interface";

type RegisterProps = {
  changeRegisterInput: Function;
  registerInput: RegisterInputType;
  setRegisterState: Function;
};

const RegisterUser = ({
  changeRegisterInput,
  registerInput,
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
        <div className="Register__Label">아이디</div>
        <input
          type="text"
          className="Register__Username"
          value={registerInput.username}
          onChange={(e) => {
            changeRegisterInput("username", e.target.value);
          }}
        />
      </div>
      <div className="Register__Input">
        <div className="Register__Label">비밀번호</div>
        <input
          type="password"
          className="Register__Password"
          value={registerInput.password1}
          onChange={(e) => {
            changeRegisterInput("password1", e.target.value);
          }}
        />
      </div>
      <div className="Register__Input">
        <div className="Register__Label">비밀번호 재입력</div>
        <input
          type="password"
          className="Register__Password"
          value={registerInput.password2}
          onChange={(e) => {
            changeRegisterInput("password2", e.target.value);
          }}
        />
      </div>
      <div className="Register__Input">
        <div className="Register__Label">이름</div>
        <input
          type="text"
          className="Register__nickname"
          value={registerInput.nickname}
          onChange={(e) => {
            changeRegisterInput("nickname", e.target.value);
          }}
        />
      </div>
      <div className="Register__Input">
        <div className="Register__Label">이메일</div>
        <input
          type="text"
          className="Register__email"
          value={registerInput.email}
          onChange={(e) => {
            changeRegisterInput("email", e.target.value);
          }}
        />
      </div>
      <input type="submit" value="다음" />
    </>
  );
};

export default RegisterUser;
