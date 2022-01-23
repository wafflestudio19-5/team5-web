import { useDispatch } from "react-redux";
import { deleteToken } from "../../../../function/localStorage";
import { logout } from "../../../../redux/authorization";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const LeftBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const tryLogout = () => {
    deleteToken();
    dispatch(logout());
  };

  const gotoMyPage = () => {
    history.push("/my");
  };
  return (
    <div className={"leftBarWrapper"}>
      <div className={"userCard"}>
        <img className={"userImg"} />
        <p className={"nickName"}>자하연 금도끼</p>
        <p className={"user"}>이름</p>
        <p className={"user"}>id</p>
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
      <div className={"ad"}>광고</div>
      <div className={"ad"}>광고</div>
      <div className={"ad"}>광고</div>
    </div>
  );
};

export default LeftBar;
