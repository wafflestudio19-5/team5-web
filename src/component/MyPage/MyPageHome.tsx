import { useHistory } from "react-router-dom";
import { deleteToken } from "../../function/localStorage";
import { logout } from "../../redux/authorization";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMyProfileAPI } from "../../API/userAPI";
import { UserType } from "../../interface/interface";

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

  const [profile, setProfile] = useState<UserType>();

  useEffect(() => {
    getMyProfileAPI().then((res) => {
      setProfile(res);
    });
  }, []);

  return (
    <div className={"MyPageMain"}>
      <section>
        <div className={"titleSection"}>
          <h1>내 정보</h1>
          <button onClick={tryLogout} className={"logOutButton"}>
            로그아웃
          </button>{" "}
        </div>
        <div className={"myInfo"}>
          <img
            className={"profileImg"}
            src={profile?.profile_picture}
            alt={"프로필 사진"}
          />
          <p className={"nickname"}> {profile?.nickname} </p>
          <p className={"info"}> {profile?.username} </p>
          <p className={"info"}>
            {" "}
            {profile?.univ} {profile?.admission_year}{" "}
          </p>
        </div>
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
