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
      <ul className={"Comment__list"}>
        {commentList.map((item) => (
          <li key={item.id} className={"Comment__item"}>
            <div className={"wrapper"}>
              <h2 className={"medium_bold"}>{item.nickname}</h2>
              <ul className={"status"}>
                <li
                  onClick={() => {
                    setCommentInput({ ...commentInput, head_comment: item.id });
                  }}
                >
                  {" "}
                  대댓글{" "}
                </li>
                <li> 공감 </li>
                {item.is_mine ? <li> 삭제 </li> : <li>신고</li>}
              </ul>
              <hr />
              <p className={"comment"}>{item.content}</p>
              <p className={"small"}>{item.created_at}</p>
              <ul className="commentVoteStatus">
                <li className="commentVote">{item.num_of_likes}</li>
              </ul>
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
