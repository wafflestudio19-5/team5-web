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

interface boardDetailDummyItem {
  id: string;
  writer: string;
  title: string;
  content: string;
}

const PostView = ({ match }: PostViewParams) => {
  const [postDetail, setPostDetail] = useState<boardDetailDummyItem>({
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
        <h3 className={"BoardView__post__profile__writer"}>
          {postDetail.writer}
        </h3>
        <div className={"BoardView__post__profile__time"}>사진</div>
        <ul className={"status"}></ul>
      </div>
    </div>
  );
};

export default PostView;
