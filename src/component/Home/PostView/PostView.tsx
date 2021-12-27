import { useEffect, useState } from "react";
import { getBoardDetailDummy } from "../../../dummy/get-dummy";

interface PostViewParams {
  match: {
    params: {
      boardId: string;
      postId: string;
    };
  };
}

interface BoardDetailDummyItem {
  id: string;
  writer: string;
  title: string;
  content: string;
}

const PostView = ({ match }: PostViewParams) => {
  const [postDetail, setPostDetail] = useState<BoardDetailDummyItem>({
    id: "",
    writer: "",
    title: "",
    content: "",
  });

  useEffect(() => {
    setPostDetail(
      getBoardDetailDummy(match.params.boardId).data.find(
        (x: { id: string }) => x.id === match.params.postId
      )
    );
  }, [setPostDetail, match.params.boardId, match.params.postId]);

  return (
    <div className={"BoardView__post"}>
      <div className={"BoardView__post__profile"}>
        <div className={"BoardView__post__profile__img"}>사진</div>
        <h3 className={"large"}>{postDetail.writer}</h3>
        <ul className={"status"}></ul>
      </div>
      <h2 className={"large"}>{postDetail.title}</h2>
      <br />
      <p className={"large"}>{postDetail.content}</p>
    </div>
  );
};

export default PostView;
