import TotalViewItem from "./TotalViewItem";
import { useEffect, useState } from "react";
import { boardDummy } from "../../../dummy/get-dummy";

interface boardDummyItem {
  id: string;
  name: string;
  available: boolean;
}

const TotalView = () => {
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    setBoardList(boardDummy);
  });
  return (
    <div className="TotalView">
      <div id={"container"}>
        <div className={"banner"}></div>
        <div className={"leftSide"}>
          <div className={"userCard"}>학생 정보</div>
          <div className={"menu"}>메뉴</div>
          <div className={"ad"}>광고</div>
          <div className={"ad"}>광고</div>
          <div className={"ad"}>광고</div>
        </div>
        <div className={"rightSide"}>
          <div className={"searchBar"}>검색</div>
          <div className={"sideNow"}>실시간 인기</div>
          <div className={"sideHot"}>핫게</div>
          <div className={"sideBest"}>Best</div>
          <div className={"sideSchool"}>학교 소식</div>
          <div className={"sideLecEval"}>최근 강의평</div>
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
