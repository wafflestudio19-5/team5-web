import TotalViewItem from "./TotalViewItem";
import { useEffect, useState } from "react";
import { getBoardAPI } from "../../../../API/boardAPI";
import { boardItemType } from "../../../../interface/interface";

const MidView = () => {
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    getBoardAPI().then((res) => setBoardList(res));
  }, []);
  return (
    <div className={"midViewWrapper"}>
      <div className={"banner"} />
      <div className="TotalView__main">
        {boardList.map((item: boardItemType) => (
          <TotalViewItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MidView;
