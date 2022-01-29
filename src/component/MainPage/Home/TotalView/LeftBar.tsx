import { useDispatch } from "react-redux";
import { deleteToken } from "../../../../function/localStorage";
import { logout } from "../../../../redux/authorization";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyProfileAPI } from "../../../../API/userAPI";
import { UserType } from "../../../../interface/interface";
import ad_1 from "../../../../image/ad_1.jpg";
import ad_2 from "../../../../image/ad_2.jpg";
import ad_3 from "../../../../image/ad_3.jpg";
import { postLogoutAPI } from "../../../../API/loginAPI";
import { toastErrorData } from "../../../../API/errorHandling";
const LeftBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const tryLogout = () => {
    postLogoutAPI().then(
      () => {
        deleteToken();
        dispatch(logout());
      },
      (e) => {
        toastErrorData(e);
      }
    );
  };

  const [userInfo, setUserInfo] = useState<UserType>();

  useEffect(() => {
    getMyProfileAPI().then((res) => {
      setUserInfo(res);
    });
  }, []);

  const gotoMyPage = () => {
    history.push("/my");
  };
  return (
    <div className={"leftBarWrapper"}>
      <div className={"userCard"}>
        <img
          className={"userImg"}
          src={userInfo?.profile_picture}
          alt={"유저 프로필"}
        />
        <p className={"nickName"}>{userInfo?.nickname}</p>
        <p className={"user"}>{userInfo?.username}</p>

        <div className={"buttons"}>
          <button onClick={gotoMyPage}>내 정보</button>
          <button onClick={tryLogout}>로그아웃</button>
        </div>
      </div>
      <ul className={"left_menu"}>
        <Link to="/mypost">
          <li id={"my_post"}>내가 쓴 글</li>
        </Link>
        <Link to="/mycomment">
          <li id={"my_comment"}>댓글 단 글</li>
        </Link>
        <Link to="/myscrap">
          <li id={"my_clip"}>내 스크랩</li>
        </Link>
      </ul>
      <img className={"ad"} src={ad_1} alt={"광고"} />
      <img className={"ad"} src={ad_2} alt={"광고"} />
      <img className={"ad"} src={ad_3} alt={"광고"} />
    </div>
  );
};

export default LeftBar;
