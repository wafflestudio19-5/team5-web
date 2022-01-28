import { useEffect, useState } from "react";
import { mainPostItemType } from "../../../../interface/interface";
import CardTypeA from "./Card/CardTypeA";
import CardTypeB from "./Card/CardTypeB";
import { getMainPostAPI } from "../../../../API/postAPI";

interface mainItemType {
  item: mainPostItemType;
}
type mainItem = mainPostItemType;

const MidView = () => {
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    getMainPostAPI().then((res) => setBoardList(res));
  }, []);

  return (
    <div className={"midViewWrapper"}>
      <img
        className={"banner"}
        src={"https://cf-eba.everytime.kr/20220101_kosaf_scholarship_home.jpg"}
      />
      <div className="TotalView__main">
        {boardList.map((item: mainPostItemType) =>
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
