import { useEffect, useState } from "react";
import { boardDummy, getBoardDetailDummy } from "../../../dummy/get-dummy";
import { Link } from "react-router-dom";

interface boardDummyItem {
  id: string;
  name: string;
  available: boolean;
}

interface totalViewItemProps {
  item: boardDummyItem;
}

interface boardDetailDummyItem {
  id: string;
  writer: string;
  title: string;
  content: string;
}

interface boardDetailDummy {
  id: string;
  name: string;
  data: boardDetailDummyItem[];
}

const TotalViewItem: React.FC<totalViewItemProps> = ({ item }) => {
  const [boardDetail, setBoardDetail] = useState<boardDetailDummy>({
    id: "",
    name: "",
    data: [],
  });
  useEffect(() => {
    setBoardDetail(getBoardDetailDummy(item.id));
  });

  return (
    <div className="TotalView__card">
      <ul className="TotalView__board">
        <li key="label" className="TotalView__board-name">
          <Link to={`/${item.id}`}>{item.name}</Link>
        </li>
        {boardDetail.data.map((item) => (
          <li key={item.id} className="BoardView__item">
            <div>{item.title}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TotalViewItem;
