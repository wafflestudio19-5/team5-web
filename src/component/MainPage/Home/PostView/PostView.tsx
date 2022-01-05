import { useEffect, useState } from "react";
import { getBoardDetailDummy } from "../../../../dummy/get-dummy";
import Comment from "./Comment/Comment";
import { useHistory, useParams } from "react-router-dom";
import request from "../../../../API/API";

interface PostViewParams {
  boardId: string;
  postId: string;
}

interface BoardDetailDummyItem {
  id: string;
  writer: string;
  title: string;
  content: string;
}

const PostView = () => {
  const history = useHistory();

  const getPostDetail = () => {
    request
      .get(`/post/${path.postId}`)
      .then((response) => {
        setPostDetail(response.data);
      })
      .catch(() => {
        console.log("게시글 불러오기 실패!"); //테스트용
      });
  };

  const path: PostViewParams = useParams();
  const [postDetail, setPostDetail] = useState<BoardDetailDummyItem>({
    id: "",
    writer: "",
    title: "",
    content: "",
  });

  const goBack = () => {
    history.push(`/${path.boardId}`);
  };

  const deletePost = () => {
    if (window.confirm("이 글을 삭제하시겠습니까?")) {
      request
        .delete(`/post/${path.postId}`)
        .then(() => {
          goBack();
        })
        .catch(() => {
          console.log("게시글 삭제 실패!"); //테스트용
        });
    }
  };

  useEffect(() => {
    getPostDetail();
  }, [setPostDetail, path.boardId, path.postId]);

  return (
    <div className={"BoardView__post"}>
      <div className={"BoardView__post__profile"}>
        <div className={"BoardView__post__profile__img"}>사진</div>
        <div className={"BoardView__post__profile__name"}>
          <h3 className={"large"}>{postDetail.writer}</h3>
          <time>시간</time>
        </div>
        <ul>
          <li>수정</li>
          <li onClick={deletePost}>삭제</li>
        </ul>
      </div>
      <h2 className={"large"}>{postDetail.title}</h2>
      <p className={"large"}>{postDetail.content}</p>
      <ul className={"status"}>
        <li className={"vote_active"}>10</li>
        <li className={"comment_active"}>10</li>
        <li className={"scrap_active"}>10</li>
      </ul>
      <br />
      <div className={"buttons"}>
        <span className={"sympathy"}>공감</span>
        <span className={"scrap"}>스크랩</span>
      </div>
      <Comment />
      <button onClick={goBack}>글 목록</button>
    </div>
  );
};

export default PostView;
