import { useEffect, useState } from "react";
import { commentDummy } from "../../../../../dummy/get-dummy";

const Comment = () => {
  interface commentItem {
    id: number;
    writer: string;
    content: string;
    time: string;
    profile: string;
  }

  const [commentList, setCommentList] = useState<commentItem[]>([]);
  useEffect(() => {
    setCommentList(commentDummy);
  });

  const writeComment = () => {};

  return (
    <div className={"Comment"}>
      <ul className={"BoardView__list"}>
        {commentList.map((item) => (
          <li key={item.id} className={"BoardView__item"}>
            <div className={"wrapper"}>
              <div className={"Comment__header"}>
                <h2 className={"medium_bold"}>{item.writer}</h2>
                <p className={"small"}>대댓글</p>
              </div>
              <p className={"medium"}>{item.content}</p>
              <p className={"small"}>{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comment;
