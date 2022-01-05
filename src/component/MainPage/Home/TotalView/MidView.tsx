import TotalViewItem from "./TotalViewItem";
import { useEffect, useState } from "react";
import { getBoard } from "../../../../API/boardAPI";
import { boardItem } from "../../../../interface/interface";

const MidView = () => {
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    getBoard().then((res) => setBoardList(res));
  });
  return (
    <div className={"midViewWrapper"}>
      <div className={"banner"} />
      <div className="TotalView__main">
        {boardList.map((item: boardItem) => (
          <TotalViewItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MidView;
