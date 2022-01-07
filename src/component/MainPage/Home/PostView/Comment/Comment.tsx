import { useEffect, useState } from "react";
import { getCommentAPI, postCommentAPI } from "../../../../../API/commentAPI";
import {
  CommentItemType,
  CommentInputType,
} from "../../../../../interface/interface";
import { useParams } from "react-router-dom";

const Comment = () => {
  interface PostViewParams {
    boardId: string;
    postId: string;
  }

  const [commentInput, setCommentInput] = useState<CommentInputType>({
    content: "",
    is_anonymous: false,
    head_comment: null,
  });

  const path = useParams<PostViewParams>();

  const getComment = () => {
    getCommentAPI(parseInt(path.postId)).then((response) => {
      setCommentList(response);
    });
  };

  const [commentList, setCommentList] = useState<CommentItemType[]>([]);
  useEffect(() => {
    getComment();
  }, []);

  const writeComment = (postId: number, input: CommentInputType) => {
    if (!input.content) {
      window.alert("내용을 입력해주세요.");
      return;
    }
    const form = new FormData();
    form.append("content", input.content);
    form.append("is_anonymous", JSON.stringify(input.is_anonymous));
    if (input.head_comment) {
      form.append("head_comment", JSON.stringify(input.head_comment));
    }
    postCommentAPI(postId, form).then((response) => {
      console.log(response);
    });
  }; // 댓글 작성 함수

  return (
    <div className={"Comment"}>
      <ul className={"BoardView__list"}>
        {commentList.map((item) => (
          <li key={item.id} className={"BoardView__item"}>
            <div className={"wrapper"}>
              <div className={"Comment__header"}>
                <h2 className={"medium_bold"}>{item.nickname}</h2>
                <p
                  className={"smallButton"}
                  onClick={() => {
                    setCommentInput({ ...commentInput, head_comment: item.id });
                  }}
                >
                  대댓글
                </p>
              </div>
              <p className={"medium"}>{item.content}</p>
              <p className={"small"}>{item.time}</p>
            </div>
          </li>
        ))}
      </ul>

      <form
        className={"CommentWrite"}
        onSubmit={(event) => {
          event.preventDefault();
          writeComment(parseInt(path.postId), commentInput);
        }}
      >
        <ul className={"option"}>
          <textarea
            className={"content"}
            name={"content"}
            placeholder={"댓글을 입력하세요."}
            onChange={(e) => {
              setCommentInput({ ...commentInput, content: e.target.value });
            }}
          />
          <li title={"완료"} className={"submit"}>
            <button type={"submit"} />
          </li>
          <li
            title={"익명"}
            className={
              commentInput.is_anonymous ? "anonymous" : "anonymousActive"
            }
          >
            <button
              type={"button"}
              className={"anonymousCheck"}
              onClick={(e) => {
                setCommentInput({
                  ...commentInput,
                  is_anonymous: !commentInput.is_anonymous,
                });
              }}
            />
          </li>
        </ul>
      </form>
    </div>
  );
};

export default Comment;
