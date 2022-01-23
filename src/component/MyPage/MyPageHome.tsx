import { useHistory } from "react-router-dom";
import { deleteToken } from "../../function/localStorage";
import { logout } from "../../redux/authorization";
import { useDispatch } from "react-redux";

const MyPageHome = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const passwordChange = () => {
    history.push("/my/password");
  };

  const emailChange = () => {
    history.push("/my/email");
  };

  const nicknameChange = () => {
    history.push("/my/nickname");
  };
  const communityRule = () => {
    history.push("/my/rules");
  };
  const withdrawal = () => {
    history.push("/my/withdrawal");
  };

  const tryLogout = () => {
    deleteToken();
    dispatch(logout());
    history.push("/");
  };

  return (
    <div className={"MyPageMain"}>
      <section>
        <div className={"titleSection"}>
          <h1>내 정보</h1>
          <button onClick={tryLogout} className={"logOutButton"}>
            로그아웃
          </button>{" "}
        </div>
        <div className={"myInfo"}>프사 이름 학번 등등</div>
      </section>
      <section>
        <h2>계정</h2>
        <a onClick={passwordChange}>비밀번호 변경</a>
        <a onClick={emailChange}>이메일 변경</a>
      </section>

      <section>
        <h2>커뮤니티</h2>
        <a onClick={nicknameChange}>닉네임 설정</a>
        <a onClick={communityRule}>커뮤니티 이용규칙</a>
      </section>

      <section>
        <h2>기타</h2>
        <a onClick={withdrawal}>회원 탈퇴</a>
      </section>
    </div>
  );
};

export default MyPageHome;
