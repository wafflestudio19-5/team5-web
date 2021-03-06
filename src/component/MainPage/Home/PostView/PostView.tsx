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
    images: [],
    tags: [],
    is_anonymous: false,
    is_question: false,
    created_at: "",
    thumbnail_picture: "",
  });

  const [editPost, setEditPost] = useState<boolean>(false);

  const goBack = () => {
    history.goBack();
  };

  const deletePost = () => {
    const result = window.confirm("??? ?????? ?????????????????????????");
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
      window.alert("????????? ?????? ????????? ??? ????????????.");
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
        window.alert("?????? ?????????????????????.");
      }
    }
  };

  const postScrapAPI = async (postId: string) => {
    if (postDetail.is_mine) {
      window.alert("????????? ?????? ???????????? ??? ????????????.");
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
        window.alert("?????? ????????????????????????.");
      }
    }
  };

  const likePost = () => {
    const result = window.confirm("??? ?????? ???????????????????");
    if (result) {
      postLikeAPI(path.postId);
    }
  };

  const scrapPost = () => {
    const result = window.confirm("??? ?????? ????????????????????????????");
    if (result) {
      postScrapAPI(path.postId);
    }
  };

  const inforToast = () => {
    toast.show({
      title: `???????????????`,
      content: `?????? ???????????? ?????? ???????????????.`,
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
            <h3>?????? ?????????</h3>
            <p>
              <textarea
                name="message"
                className={"text"}
                placeholder={"????????? ??????????????????"}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
            </p>
            <button className={"sendButton"} onClick={sendMessage}>
              ??????
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
            alt={"????????? ??????"}
            className={"BoardView__post__profile__img"}
          />
          <div className={"BoardView__post__profile__name"}>
            <h3 className={"large"}>{postDetail.writer}</h3>
            <time>{time(postDetail.created_at)}</time>
          </div>
          {postDetail.is_mine ? (
            <ul>
              <li onClick={() => setEditPost(true)}>??????</li>
              <li onClick={deletePost}>??????</li>
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
                ??????
              </li>
              <li onClick={inforToast}>??????</li>
            </ul>
          )}
        </div>
        <h2 className={"large"}>{postDetail.title}</h2>
        <p className={"large"}>{postDetail.content}</p>
        <div id={"images"}>
          {postDetail.images.map((item, index) => (
            <img
              className={"image"}
              key={index}
              src={item.image}
              alt={"attachedImg"}
            />
          ))}
        </div>

        {postDetail.is_question && (
          <div className={"question_description_Box"}>
            <p className={"question_description"}>
              ?????? ?????? ???????????? ????????? ????????? ?????? ?????? ?????? ????????????, ??????
              ????????? ????????? ?????? ??? ?????? ?????????.
              <br />
              ??????, ?????? ???????????? ????????? ????????? ????????? ???????????? ??????, ?????????
              ?????? ???????????? <b>?????? ?????? ??? ????????? ??? ????????????.</b>
            </p>
          </div>
        )}
        <ul className={"status"}>
          {postDetail.images.length !== 0 && (
            <li className={"attach_active"}>{postDetail.images.length}</li>
          )}
          <li className={"vote_active"}>{postDetail.num_of_likes}</li>
          <li className={"comment_active"}>{postDetail.num_of_comments}</li>
          <li className={"scrap_active"}>{postDetail.num_of_scrap}</li>
        </ul>
        <br />
        <div className={"buttons"}>
          <span className={"sympathy"} onClick={likePost}>
            ??????
          </span>
          <span className={"scrap"} onClick={scrapPost}>
            ?????????
          </span>
          <Comment
            setPostDetail={setPostDetail}
            postDetail={postDetail}
            setMsgModalOpen={setMsgModalOpen}
            setMsgType={setMsgType}
          />
          <button className={"post__button goBackList"} onClick={goBack}>
            ??? ??????
          </button>
        </div>
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
        ??? ?????? ??????
      </button>
    </div>
  );
};

export default PostView;
