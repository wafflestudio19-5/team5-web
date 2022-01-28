import { Link } from "react-router-dom";
import {
  mainPostItemType,
  postListType,
} from "../../../../../interface/interface";
import { time } from "../../../../../function/timeCal";

interface hotType {
  id: string;
  title: string;
}

interface totalViewItemProps {
  item: mainPostItemType;
}
const CardTypeA: React.FC<totalViewItemProps> = ({ item }) => {
  return (
    <div className="cardA">
      <h3 key="label" className="board-name">
        <Link to={`/${item.id}`}>{item.title}</Link>
      </h3>
      <ul className="board">
        {item.posts.length === 0 ? (
          <li className="board-item">
            <p>아직 게시글이 없습니다.</p>
          </li>
        ) : (
          item.posts.map((postItem) => (
            <Link to={`/${item.id}/${postItem.id}`} key={postItem.id}>
              <li key={postItem.id} className="board-item">
                <p>{postItem.title}</p>
                <time>{time(postItem.created_at)}</time>
              </li>
            </Link>
          ))
        )}
      </ul>
    </div>
  );
};

export default CardTypeA;
