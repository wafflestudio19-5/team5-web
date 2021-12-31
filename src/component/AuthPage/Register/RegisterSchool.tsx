type RegisterProps = {
  changeRegisterInput: Function;
  setRegisterState: Function;
};

const yearList = [
  "10학번",
  "11학번",
  "12학번",
  "13학번",
  "14학번",
  "15학번",
  "16학번",
  "17학번",
  "18학번",
  "19학번",
  "20학번",
  "21학번",
  "22학번",
  "그 외 학번",
  "졸업생",
] as const;

const RegisterSchool: React.FC<RegisterProps> = ({}) => {
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
        <div className="Register__Label">입학년도</div>
        <select></select>
      </div>
      <div className="Register__Input">
        <div className="Register__Label">학교</div>
        <select></select>
      </div>
      <input type="submit" value="다음" />
    </form>
  );
};

export default RegisterSchool;
