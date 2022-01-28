import { useEffect, useState } from "react";
import Comment from "./Comment/Comment";
import { useHistory, useParams } from "react-router-dom";
import { getPostDetailAPI } from "../../../../API/postDetailAPI";
import Edit from "./Edit";
import { postDeleteAPI } from "../../../../API/postAPI";
import { postItemType, MessageType } from "../../../../interface/interface";
import { time } from "../../../../function/timeCal";
import { toast } from "../../../Toast/ToastManager";
import { authRequest } from "../../../../API/API";
import { toastErrorData } from "../../../../API/errorHandling";
import { postMessage } from "../../../../API/messageAPI";

interface PostViewParams {
  boardId: string;
  postId: string;
}

const PostView = () => {
  const history = useHistory();
  const [isMsgModalOpen, setMsgModalOpen] = useState<boolean>(false);
  const [isReportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [msgType, setMsgType] = useState<MessageType>({
    started_from: "",
    id: 0,
  });

  const getPostDetail = () => {
    getPostDetailAPI(parseInt(path.postId)).then((response) => {
      setPostDetail({
        ...response,
        tags: response.tags,
      });
    });
  };

  const sendMessage = () => {
    const form = new FormData();
    form.append("content", message);
    console.log(form);
    console.log(message);
    postMessage(msgType.started_from, msgType.id, form).then((res) => {
      closeModal();
    });
  };

  const closeModal = () => {
    setMsgModalOpen(false);
    setReportModalOpen(false);
    setMessage("");
  };

  const path = useParams<PostViewParams>();
  const [postDetail, setPostDetail] = useState<postItemType>({
    id: "",
    board: { id: 0, title: "" },
    title_exist: true,
    writer: "",
    title: "",
    content: "",
    is_mine: false,
    num_of_likes: 0,
    num_of_scrap: 0,
    profile_picture: "",
    num_of_comments: 0,
    images: "",
    tags: [],
    is_anonymous: false,
    is_question: false,
    created_at: "",
  });

  const [editPost, setEditPost] = useState<boolean>(false);

  const goBack = () => {
    history.goBack();
  };

  const deletePost = () => {
    const result = window.confirm("이 글을 삭제하시겠습니까?");
    if (result) {
      postDeleteAPI(path.postId).then(
        (res) => {
          goBack();
        },
        (error) => {
          if (error.response) {
            toastErrorData(error.response.data);
          }
        }
      );
    }
  };

  const postLikeAPI = async (postId: string) => {
    if (postDetail.is_mine) {
      window.alert("자신의 글을 공감할 수 없습니다.");
    } else {
      try {
        const response = await authRequest.post(`/post/${postId}/like/`);
        if (response.data.is_success) {
          setPostDetail({
            ...postDetail,
            num_of_likes: postDetail.num_of_likes + 1,
          });
        }
      } catch (e) {
        window.alert("이미 공감하였습니다.");
      }
    }
  };

  const postScrapAPI = async (postId: string) => {
    if (postDetail.is_mine) {
      window.alert("자신의 글을 스크랩할 수 없습니다.");
    } else {
      try {
        const response = await authRequest.post(`/post/${postId}/scrap/`);
        if (response.data.is_success) {
          setPostDetail({
            ...postDetail,
            num_of_scrap: postDetail.num_of_scrap + 1,
          });
        }
      } catch (e) {
        window.alert("이미 스크랩하였습니다.");
      }
    }
  };

  const likePost = () => {
    const result = window.confirm("이 글에 공감하십니까?");
    if (result) {
      postLikeAPI(path.postId);
    }
  };

  const scrapPost = () => {
    const result = window.confirm("이 글을 스크랩하시겠습니까?");
    if (result) {
      postScrapAPI(path.postId);
    }
  };

  const inforToast = () => {
    toast.show({
      title: `죄송합니다`,
      content: `아직 지원하지 않는 기능입니다.`,
      duration: 3000,
    });
  };

  useEffect(() => {
    getPostDetail();
  }, [setPostDetail, path.boardId, path.postId, editPost]);

  return !editPost ? (
    <div>
      {isMsgModalOpen ? (
        <div className={"Modal_Wrapper"} onClick={() => closeModal()}>
          <div
            className={"Modal"}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h3>쪽지 보내기</h3>
            <p>
              <textarea
                name="message"
                className={"text"}
                placeholder={"내용을 입력해주세요"}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
            </p>
            <button className={"sendButton"} onClick={sendMessage}>
              전송
            </button>
            <div
              className="close"
              onClick={() => {
                closeModal();
              }}
            />
          </div>
        </div>
      ) : (
        <div />
      )}
      <div className={"BoardView__post"}>
        <div className={"BoardView__post__profile"}>
          <img
            src={postDetail.profile_picture}
            alt={"프로필 사진"}
            className={"BoardView__post__profile__img"}
          />
          <div className={"BoardView__post__profile__name"}>
            <h3 className={"large"}>{postDetail.writer}</h3>
            <time>{time(postDetail.created_at)}</time>
          </div>
          {postDetail.is_mine ? (
            <ul>
              <li onClick={() => setEditPost(true)}>수정</li>
              <li onClick={deletePost}>삭제</li>
            </ul>
          ) : (
            <ul>
              <li
                onClick={() => {
                  setMsgModalOpen(true);
                  setMsgType({
                    started_from: "post",
                    id: Number(postDetail.id),
                  });
                }}
              >
                쪽지
              </li>
              <li onClick={inforToast}>신고</li>
            </ul>
          )}
        </div>
        <h2 className={"large"}>{postDetail.title}</h2>
        <p className={"large"}>{postDetail.content}</p>
        {postDetail.is_question && (
          <div className={"question_description_Box"}>
            <p className={"question_description"}>
              질문 글을 작성하면 게시판 상단에 일정 기간 동안 노출되어, 더욱
              빠르게 답변을 얻을 수 있게 됩니다.
              <br />
              또한, 다른 학우들이 정성껏 작성한 답변을 유지하기 위해, 댓글이
              달린 이후에는 <b>글을 수정 및 삭제할 수 없습니다.</b>
            </p>
          </div>
        )}
        <ul className={"status"}>
          <li className={"vote_active"}>{postDetail.num_of_likes}</li>
          <li className={"comment_active"}>{postDetail.num_of_comments}</li>
          <li className={"scrap_active"}>{postDetail.num_of_scrap}</li>
        </ul>
        <br />
        <div className={"buttons"}>
          <span className={"sympathy"} onClick={likePost}>
            공감
          </span>
          <span className={"scrap"} onClick={scrapPost}>
            스크랩
          </span>
        </div>
        <Comment setPostDetail={setPostDetail} postDetail={postDetail} />
        <button className={"post__button goBackList"} onClick={goBack}>
          글 목록
        </button>
      </div>
    </div>
  ) : (
    <div className={"BoardView__post"}>
      <Edit
        postDetail={postDetail}
        boardId={path.boardId}
        setEditPost={setEditPost}
      />
      <button
        className={"post__button cancelEdit"}
        onClick={() => setEditPost(false)}
      >
        글 수정 취소
      </button>
    </div>
  );
};

export default PostView;
