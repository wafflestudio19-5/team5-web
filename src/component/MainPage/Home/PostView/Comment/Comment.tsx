import { SetStateAction, useEffect, useState } from "react";
import {
  deleteCommentAPI,
  getCommentAPI,
  postCommentAPI,
  postCommentVoteAPI,
} from "../../../../../API/commentAPI";
import {
  CommentItemType,
  CommentInputType,
  postItemType,
} from "../../../../../interface/interface";
import { useParams } from "react-router-dom";
import { time } from "../../../../../function/timeCal";

interface commentProps {
  postDetail: postItemType;
  setPostDetail: (
    value: postItemType | ((prevState: postItemType) => postItemType)
  ) => void;
}

const Comment = ({ postDetail, setPostDetail }: commentProps) => {
  interface PostViewParams {
    boardId: string;
    postId: string;
  }

  const [commentInput, setCommentInput] = useState<CommentInputType>({
    content: "",
    is_anonymous: false,
    head_comment: null,
  });

  const [replyInput, setReplyInput] = useState<CommentInputType>({
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
  const [replyOpen, setReplyOpen] = useState<null | number>(null);
  const [commentList, setCommentList] = useState<CommentItemType[]>([]);
  useEffect(() => {}, [commentList]);
  useEffect(() => {
    getComment();
  }, [postDetail]);

  const writeComment = (postId: number, input: CommentInputType) => {
    if (!input.content || input.content.replace(/\s|　/gi, "") === "") {
      window.alert("내용을 입력해주세요.");
      return;
    }
    console.log(input);
    const form = new FormData();
    form.append("content", input.content);
    form.append("is_anonymous", JSON.stringify(input.is_anonymous));
    if (input.head_comment) {
      form.append("head_comment", JSON.stringify(input.head_comment));
    }

    postCommentAPI(postId, form).then((response) => {
      console.log(response);
      setCommentList(response);
      setCommentInput({ ...commentInput, content: "" });
      setReplyInput({ ...replyInput, content: "" });
      setPostDetail({
        ...postDetail,
        num_of_comments: postDetail.num_of_comments + 1,
      });
    });
  }; // 댓글 작성 함수

  const onKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      if (commentInput.content) {
        writeComment(parseInt(path.postId), commentInput);
      } else {
        writeComment(parseInt(path.postId), replyInput);
      }
    }
  };

  const voteComment = (comment: CommentItemType) => {
    if (comment.is_mine) {
      window.alert("내가 쓴 댓글은 공감할 수 없습니다.");
      return;
    }

    if (window.confirm("이 댓글에 공감하십니까?")) {
      postCommentVoteAPI(comment.id).then((response) => {
        console.log(response);
        getComment();
        if (!response.is_success) {
          if (response.error_code === 1) {
            window.alert("이미 공감한 댓글입니다.");
          } else {
            window.alert("오래된 댓글은 공감할 수 없습니다.");
          }
        }
      });
    } else {
      return;
    }
  };

  const deleteComment = (commentID: number) => {
    if (window.confirm("이 댓글을 삭제하시겠습니까?")) {
      deleteCommentAPI(parseInt(path.postId), commentID).then((response) => {
        console.log(response);
        if (response.is_success) {
          setCommentList(response.comments);
        }
      });
    }
  };

  return (
    <div className={"Comment"}>
      <ul className={"Comment__list"}>
        {commentList.map((item) => (
          <li key={item.id} className={"Comment__item"}>
            <div className={"wrapper"}>
              <img
                className={"Comment__Img"}
                src={item.profile_picture}
                alt={"프로필 사진"}
              />
              {item.user_type === "글쓴이" ? (
                <h2 className={"medium_bold_writer"}>{item.nickname}</h2>
              ) : (
                <h2 className={"medium_bold"}>{item.nickname}</h2>
              )}
              <ul className={"status"}>
                {item.head_comment ? (
                  <li />
                ) : (
                  <li
                    onClick={() => {
                      setReplyOpen(item.id);
                      setReplyInput({ ...replyInput, head_comment: item.id });
                    }}
                  >
                    {" "}
                    대댓글{" "}
                  </li>
                )}

                <li
                  onClick={() => {
                    voteComment(item);
                  }}
                >
                  {" "}
                  공감{" "}
                </li>
                {item.is_mine ? (
                  <li onClick={() => deleteComment(item.id)}> 삭제 </li>
                ) : (
                  <li>신고</li>
                )}
              </ul>
              <hr />
              <p className={"comment"}>{item.content}</p>
              <p className={"small"}>{time(item.created_at)}</p>
              {item.num_of_likes !== 0 ? (
                <ul className="commentVoteStatus">
                  <li
                    className="commentVote"
                    onClick={() => {
                      voteComment(item);
                    }}
                  >
                    {item.num_of_likes}
                  </li>
                </ul>
              ) : (
                <ul />
              )}
            </div>
            {item.replys.map((reply) => (
              <div key={reply.id} className={"wrapperReply"}>
                <img
                  className={"Reply__Img"}
                  src={reply.profile_picture}
                  alt={"프로필 사진"}
                />
                {reply.user_type === "글쓴이" ? (
                  <h2 className={"medium_bold_writer"}>{reply.nickname}</h2>
                ) : (
                  <h2 className={"medium_bold"}>{reply.nickname}</h2>
                )}
                <ul className={"status"}>
                  <li
                    onClick={() => {
                      voteComment(reply);
                    }}
                  >
                    {" "}
                    공감{" "}
                  </li>
                  {reply.is_mine ? (
                    <li onClick={() => deleteComment(reply.id)}> 삭제 </li>
                  ) : (
                    <li>신고</li>
                  )}
                </ul>
                <hr />
                <p className={"comment"}>{reply.content}</p>
                <p className={"small"}>{time(reply.created_at)}</p>
                {reply.num_of_likes !== 0 ? (
                  <ul className="commentVoteStatus">
                    <li
                      className="commentVote"
                      onClick={() => {
                        voteComment(reply);
                      }}
                    >
                      {reply.num_of_likes}
                    </li>
                  </ul>
                ) : (
                  <ul />
                )}
              </div>
            ))}
            {replyOpen === item.id ? (
              <form
                className={"replyWrite"}
                onSubmit={(event) => {
                  event.preventDefault();
                  writeComment(parseInt(path.postId), replyInput);
                }}
              >
                {" "}
                <ul className={"option"}>
                  <textarea
                    className={"content"}
                    onKeyPress={(e) => {
                      onKeyPress(e);
                    }}
                    name={"content"}
                    placeholder={"대댓글을 입력하세요."}
                    value={replyInput.content}
                    onChange={(e) => {
                      setReplyInput({
                        ...replyInput,
                        content: e.target.value,
                      });
                    }}
                  />
                  <li title={"완료"} className={"submit"}>
                    <button type={"submit"} />
                  </li>
                  <li
                    title={"익명"}
                    className={
                      replyInput.is_anonymous ? "anonymous" : "anonymousActive"
                    }
                  >
                    <button
                      type={"button"}
                      className={"anonymousCheck"}
                      onClick={(e) => {
                        setReplyInput({
                          ...replyInput,
                          is_anonymous: !replyInput.is_anonymous,
                        });
                      }}
                    />
                  </li>
                </ul>
              </form>
            ) : (
              <div />
            )}
          </li>
        ))}
      </ul>

      <form
        className={"commentWrite"}
        onSubmit={(event) => {
          event.preventDefault();
          writeComment(parseInt(path.postId), commentInput);
        }}
      >
        <ul className={"option"}>
          <textarea
            className={"content"}
            onKeyPress={(e) => {
              onKeyPress(e);
            }}
            name={"content"}
            placeholder={"댓글을 입력하세요."}
            value={commentInput.content}
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
