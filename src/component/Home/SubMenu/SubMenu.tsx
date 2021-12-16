import { useEffect, useState } from "react";
import { boardDummy } from "../../../dummy/get-dummy";
import SubMenuItem from "./SubMenuItem";

interface boardDummyItem {
  id: number;
  name: string;
  available: boolean;
}

const SubMenu = () => {
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    setBoardList(boardDummy);
  }, []);

  return (
    <div className="SubMenu">
      <ul className="SubMenu__group">
        {boardList.map((item: boardDummyItem) => (
          <SubMenuItem key={item.id} item={item} />
        ))}
      </ul>
      <div className="SubMenu__group">라마바</div>
    </div>
  );
};

export default SubMenu;
