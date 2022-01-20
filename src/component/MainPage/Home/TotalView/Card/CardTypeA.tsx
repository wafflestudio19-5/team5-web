import { Link } from "react-router-dom";
import {
  boardItemType,
  postListType,
} from "../../../../../interface/interface";
import { useEffect, useState } from "react";
import { getPostAPI } from "../../../../../API/postAPI";
import { time } from "../../../../../function/timeCal";

interface totalViewItemProps {
  item: boardItemType;
}
const CardTypeA: React.FC<totalViewItemProps> = ({ item }) => {
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
    <div className="cardA">
      <h3 key="label" className="board-name">
        <Link to={`/${item.id}`}>{item.title}</Link>
      </h3>
      <ul className="board">
        {boardPreview.count === 0 ? (
          <li className="board-item">
            <p>아직 게시글이 없습니다.</p>
          </li>
        ) : (
          boardPreview.results.map((postItem) => (
            <Link to={`/${item.id}/${postItem.id}`} key={postItem.id}>
              <li key={postItem.id} className="board-item">
                <p>{postItem.title}</p>
                <time>{time(postItem.created_at)}</time>
              </li>
            </Link>
          ))
        )}
        {}
      </ul>
    </div>
  );
};

export default CardTypeA;
