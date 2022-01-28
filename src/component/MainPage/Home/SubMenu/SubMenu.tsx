import { useEffect, useState } from "react";
import SubMenuItem from "./SubMenuItem";
import { getBoardAPI } from "../../../../API/boardAPI";
import { boardListType } from "../../../../interface/interface";

const SubMenu = () => {
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    getBoardAPI().then((res) => setBoardList(res));
  }, []);

  return (
    <div className="SubMenu">
      <ul className="SubMenu__group">
        {boardList.map((item: boardListType) => {
          if (item.id <= 6) return <SubMenuItem key={item.id} item={item} />;
        })}
      </ul>
    </div>
  );
};

export default SubMenu;
