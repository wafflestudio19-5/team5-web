import TotalViewItem from "./TotalViewItem";
import { useEffect, useState } from "react";
import { boardDummy } from "../../../../dummy/get-dummy";

interface boardDummyItem {
  id: string;
  name: string;
  available: boolean;
}

const MidView = () => {
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    setBoardList(boardDummy);
  });
  return (
    <div className={"midViewWrapper"}>
      <div className={"banner"} />
      <div className="TotalView__main">
        {boardList.map((item: boardDummyItem) => (
          <TotalViewItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MidView;
