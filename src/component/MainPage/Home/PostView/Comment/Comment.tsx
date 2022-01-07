import { useEffect, useState } from "react";
import { getCommentAPI } from "../../../../../API/commentAPI";
import { CommentItemType } from "../../../../../interface/interface";
import { useParams } from "react-router-dom";

const Comment = () => {
  interface PostViewParams {
    boardId: string;
    postId: string;
  }

  const path: PostViewParams = useParams();

  const getComment = () => {
    getCommentAPI(parseInt(path.postId)).then((response) => {
      console.log(response);
    });
  };

  const [commentList, setCommentList] = useState<CommentItemType[]>([]);
  useEffect(() => {
    getComment();
  }, []);

  const [isAnonymous, setAnonymous] = useState<boolean>(false); //익명 여부

  const writeComment = () => {}; // 댓글 작성 함수; API 완성시 작성 예정

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

      <form className={"CommentWrite"}>
        <ul className={"option"}>
          <textarea
            className={"content"}
            name={"content"}
            placeholder={"댓글을 입력하세요."}
          />
          <li title={"완료"} className={"submit"} />
          <li title={"익명"} className={"anonymus"} />
        </ul>
      </form>
    </div>
  );
};

export default Comment;
