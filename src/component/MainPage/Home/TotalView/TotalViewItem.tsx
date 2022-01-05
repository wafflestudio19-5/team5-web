import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { boardItemType, postListType } from "../../../../interface/interface";
import { getPostAPI } from "../../../../API/postAPI";

interface totalViewItemProps {
  item: boardItemType;
}

const TotalViewItem: React.FC<totalViewItemProps> = ({ item }) => {
  const [boardPreview, setBoardPreview] = useState<postListType>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  useEffect(() => {
    getPostAPI(item.id, 0, 4).then((res) => setBoardPreview(res));
  }, []);

  return (
    <div className="card">
      <h3 key="label" className="board-name">
        <Link to={`/${item.id}`}>{item.title}</Link>
      </h3>
      <ul className="board">
        {boardPreview.results.map((postItem) => (
          <li key={postItem.id} className="board-item">
            <Link to={`/${item.id}/${postItem.id}`}>
              <p>{postItem.title}</p>
            </Link>
            <time>시간</time>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TotalViewItem;
