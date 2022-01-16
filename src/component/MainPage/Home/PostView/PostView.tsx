import { useEffect, useState } from "react";
import Comment from "./Comment/Comment";
import { useHistory, useParams } from "react-router-dom";
import { getPostDetailAPI } from "../../../../API/postDetailAPI";
import Edit from "./Edit";
import { postDeleteAPI } from "../../../../API/postAPI";
import { postItemType } from "../../../../interface/interface";
import { time } from "../../../../function/timeCal";

interface PostViewParams {
  boardId: string;
  postId: string;
}

const PostView = () => {
  const history = useHistory();

  const getPostDetail = () => {
    getPostDetailAPI(parseInt(path.postId)).then((response) => {
      setPostDetail({
        ...response,
        tags: JSON.parse(response.tags),
        created_at: time(response.created_at),
      });
    });
  };

  const path = useParams<PostViewParams>();
  const [postDetail, setPostDetail] = useState<postItemType>({
    id: "",
    writer: "",
    title: "",
    content: "",
    is_mine: false,
    num_of_likes: 0,
    num_of_scrap: 0,
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
    console.log("d");
    const result = window.confirm("이 글을 삭제하시겠습니까?");
    if (result) {
      postDeleteAPI(path.postId);
      goBack();
    }
  };

  useEffect(() => {
    getPostDetail();
  }, [setPostDetail, path.boardId, path.postId, editPost]);

  return editPost == false ? (
    <div className={"BoardView__post"}>
      <div className={"BoardView__post__profile"}>
        <div className={"BoardView__post__profile__img"}>사진</div>
        <div className={"BoardView__post__profile__name"}>
          <h3 className={"large"}>{postDetail.writer}</h3>
          <time>{postDetail.created_at}</time>
        </div>
        <ul>
          <li onClick={() => setEditPost(true)}>수정</li>
          <li onClick={deletePost}>삭제</li>
        </ul>
      </div>
      <h2 className={"large"}>{postDetail.title}</h2>
      <p className={"large"}>{postDetail.content}</p>
      <ul className={"status"}>
        <li>{postDetail.is_mine.toString()}</li>
        <li>{}</li>
        <li className={"vote_active"}>{postDetail.num_of_likes}</li>
        <li className={"comment_active"}>{postDetail.num_of_comments}</li>
        <li className={"scrap_active"}>{postDetail.num_of_scrap}</li>
      </ul>
      <br />
      <div className={"buttons"}>
        <span className={"sympathy"}>공감</span>
        <span className={"scrap"}>스크랩</span>
      </div>
      <Comment writer={postDetail.writer} />
      <button className={"post__button goBackList"} onClick={goBack}>
        글 목록
      </button>
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
