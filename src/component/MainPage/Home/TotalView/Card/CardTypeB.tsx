import { mainPostItemType } from "../../../../../interface/interface";
import { Link } from "react-router-dom";
import { time } from "../../../../../function/timeCal";

interface totalViewItemProps {
  item: mainPostItemType;
}

const CardTypeB: React.FC<totalViewItemProps> = ({ item }) => {
  return (
    <div className={"cardB"}>
      <h3 key="label" className="board-name">
        <Link to={`/${item.id}`}>{item.title}</Link>
      </h3>
      <ul className={"board"}>
        {item.posts.length === 0 ? (
          <li className="board-item">
            <p>아직 게시글이 없습니다.</p>
          </li>
        ) : (
          item.posts.map((postItem) => (
            <Link to={`/${item.id}/${postItem.id}`} key={postItem.id}>
              <li className={"board-item"}>
                <p className={"card-content"}>{postItem.content}</p>
                <div className={"card-information"}>
                  <h4>{time(postItem.created_at)}</h4>
                  <ul className={"status"}>
                    <li className={"vote_active"}>{postItem.num_of_likes}</li>
                    <li className={"comment_active"}>
                      {postItem.num_of_comments}
                    </li>
                  </ul>
                </div>
              </li>
            </Link>
          ))
        )}
      </ul>
    </div>
  );
};

export default CardTypeB;
