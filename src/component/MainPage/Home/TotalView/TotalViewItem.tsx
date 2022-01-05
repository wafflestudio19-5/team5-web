import { useEffect, useState } from 'react';
import { boardDummy, getBoardDetailDummy } from '../../../../dummy/get-dummy';
import { Link } from 'react-router-dom';

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
    id: '',
    name: '',
    data: [],
  });
  useEffect(() => {
    setBoardDetail(getBoardDetailDummy(item.id));
  });

  return (
    <div className="card">
      <h3 key="label" className="board-name">
        <Link to={`/${item.id}`}>{item.name}</Link>
      </h3>
      <ul className="board">
        {/*<li key="label" className="board-name">*/}
        {/*  <Link to={`/${item.id}`}>*/}
        {/*    <h3>{item.name}</h3>*/}
        {/*  </Link>*/}
        {/*</li>*/}
        {boardDetail.data.map((item) => (
          <li key={item.id} className="board-item">
            <Link to={`/${boardDetail.id}/${item.id}`}>
              <p>{item.title}</p>
            </Link>
            <time>시간</time>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TotalViewItem;
