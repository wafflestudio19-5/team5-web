import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { boardItem } from "../../../../interface/interface";

interface boardDetailDummyItem {
  id: string;
  writer: string;
  title: string;
  content: string;
}

interface boardDetailType {
  id: string;
  title: string;
  data: boardDetailDummyItem[];
}

interface totalViewItemProps {
  item: boardItem;
}

const TotalViewItem: React.FC<totalViewItemProps> = ({ item }) => {
  const [boardDetail, setBoardDetail] = useState<boardDetailType>({
    id: "",
    title: "",
    data: [],
  });
  useEffect(() => {});

  return (
    <div className="card">
      <h3 key="label" className="board-name">
        <Link to={`/${item.id}`}>{item.title}</Link>
      </h3>
      <ul className="board">
        {/*<li key="label" className="board-name">*/}
        {/*  <Link to={`/${item.id}`}>*/}
        {/*    <h3>{item.name}</h3>*/}
        {/*  </Link>*/}
        {/*</li>*/}
        {/*{boardDetail.data.map((item) => (*/}
        {/*  <li key={item.id} className="board-item">*/}
        {/*    <Link to={`/${boardDetail.id}/${item.id}`}>*/}
        {/*      <p>{item.title}</p>*/}
        {/*    </Link>*/}
        {/*    <time>시간</time>*/}
        {/*  </li>*/}
        {/*))}*/}
      </ul>
    </div>
  );
};

export default TotalViewItem;
