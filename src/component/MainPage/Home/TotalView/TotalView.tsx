import TotalViewItem from "./TotalViewItem";
import { useEffect, useState } from "react";
import { boardDummy } from "../../../../dummy/get-dummy";
import RightMenu from "../RightMenu/RightMenu";
import { logout } from "../../../../redux/authorization";
import { useDispatch } from "react-redux";
import { deleteToken } from "../../../../function/localStorage";

interface boardDummyItem {
  id: string;
  name: string;
  available: boolean;
}

const TotalView = () => {
  const dispatch = useDispatch();
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    setBoardList(boardDummy);
  });
  const tryLogout = () => {
    deleteToken();
    dispatch(logout());
  };

  return (
    <div className="TotalView">
      <div id={"container"}>
        <div className={"banner"}></div>
        <div className={"leftSide"}>
          <div
            className={"userCard"}
            onClick={() => {
              tryLogout();
            }}
          >
            로그아웃
          </div>
          <div className={"menu"}>메뉴</div>
          <div className={"ad"}>광고</div>
          <div className={"ad"}>광고</div>
          <div className={"ad"}>광고</div>
        </div>
        <div className={"rightSide"}>
          <div className={"searchBar"}>검색</div>
          <RightMenu />
        </div>
        <div className="TotalView__main">
          {boardList.map((item: boardDummyItem) => (
            <TotalViewItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TotalView;
