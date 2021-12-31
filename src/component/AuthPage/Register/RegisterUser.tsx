const RegisterUser = () => {
  return (
    <form className="Register__Form">
      <div className="Register__Text">
        <h2>에브리타임 회원 가입</h2>
        <p>
          에브리타임 계정으로 캠퍼스픽, 에브리타임 등 <br />
          다양한 대학생 서비스를 모두 이용하실 수 있습니다
        </p>
      </div>
      <div className="Register__Input">
        <div className="Register__Label">아이디</div>
        <input type="text" className="Register__Username" />
      </div>
      <div className="Register__Input">
        <div className="Register__Label">비밀번호</div>
        <input type="text" className="Register__Password" />
      </div>
      <div className="Register__Input">
        <div className="Register__Label">이메일</div>
        <input type="text" className="Register__Username" />
      </div>
      <input type="submit" value="다음" />
    </form>
  );
};

export default RegisterUser;
