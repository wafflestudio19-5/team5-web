import { useHistory } from "react-router-dom";

const MyPage = () => {
  const history = useHistory();

  const passwordChange = () => {
    history.push("/password");
  };

  return (
    <div className={"MyPageMain"}>
      <section>
        <h2>계정</h2>
        <a onClick={passwordChange}>비밀번호 변경</a>
        <a>이메일 변경</a>
      </section>

      <section>
        <h2>커뮤니티</h2>
        <a>닉네임 설정</a>
        <a>커뮤니티 이용규칙</a>
      </section>

      <section>
        <h2>기타</h2>
        <a>회원 탈퇴</a>
      </section>
    </div>
  );
};

export default MyPage;
