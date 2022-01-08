import { RegisterInputType } from "../../../interface/interface";

type RegisterProps = {
  changeRegisterInput: Function;
  registerInput: RegisterInputType;
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

const RegisterSchool = ({
  changeRegisterInput,
  registerInput,
  setRegisterState,
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
        <div className="Register__Label">입학년도</div>
        <select
          value={registerInput.admission_year}
          onChange={(e) => {
            changeRegisterInput("admission_year", e.target.value);
          }}
        >
          <option key="없음" value="">
            연도 선택(학번)
          </option>
          {yearList.map((yearString) => {
            return (
              <option key={`${yearString}`} value={`${yearString}`}>
                {yearString}
              </option>
            );
          })}
        </select>
      </div>
      <div className="Register__Input">
        <div className="Register__Label">학교</div>
        <select
          value={registerInput.univ}
          onChange={(e) => {
            changeRegisterInput("univ", e.target.value);
          }}
        >
          <option value="">학교 선택</option>
          <option value="서울대학교">서울대학교</option>
        </select>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          if (registerInput.admission_year.length < 1) {
            alert("학번을 입력하세요");
          } else if (registerInput.univ.length < 1) {
            alert("학교를 입력하세요");
          } else {
            setRegisterState("user");
          }
        }}
      >
        다음
      </button>
    </>
  );
};

export default RegisterSchool;
