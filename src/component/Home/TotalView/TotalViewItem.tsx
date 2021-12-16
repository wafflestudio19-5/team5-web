import { useEffect, useState } from "react";
import { boardDummy } from "../../../dummy/get-dummy";
import { Link } from "react-router-dom";

interface boardDummyItem {
  id: string;
  name: string;
  available: boolean;
}

interface totalViewItemProps {
  item: boardDummyItem;
}

const TotalViewItem: React.FC<totalViewItemProps> = ({ item }) => {
  return (
    <div className="TotalView__card">
      <ul className="TotalView__board">
        <li className="TotalView__board-name">
          <Link to={`/${item.id}`}>{item.name}</Link>
        </li>
      </ul>
    </div>
  );
};

export default TotalViewItem;
