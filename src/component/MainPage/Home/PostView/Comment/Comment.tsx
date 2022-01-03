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

  return (
    <div className={"Comment"}>
      <ul className={"BoardView__list"}>
        {commentList.map((item) => (
          <li key={item.id} className={"BoardView__item"}>
            <div className={"wrapper"}>
              <h2 className={"medium_bold"}>{item.writer}</h2>
              <ul className={"Comment__option"}>
                <p className={"small"}> 대댓글</p>
                <p className={"small"}> 공감</p>
                <p className={"small"}> 쪽지</p>
                <p className={"small"}> 신고</p>
              </ul>
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
