import { useEffect, useState } from "react";
import { getBoardAPI } from "../../../../API/boardAPI";
import { boardItemType } from "../../../../interface/interface";
import CardTypeA from "./Card/CardTypeA";
import CardTypeB from "./Card/CardTypeB";

const MidView = () => {
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    getBoardAPI().then((res) => setBoardList(res));
  }, []);
  return (
    <div className={"midViewWrapper"}>
      <img
        className={"banner"}
        src={"https://cf-eba.everytime.kr/20220101_kosaf_scholarship_home.jpg"}
      />
      <div className="TotalView__main">
        {boardList.map((item: boardItemType) =>
          item.id === 2 || item.id === 3 || item.id === 4 ? (
            <CardTypeB key={item.id} item={item} />
          ) : (
            <CardTypeA key={item.id} item={item} />
          )
        )}
      </div>
    </div>
  );
};

export default MidView;
