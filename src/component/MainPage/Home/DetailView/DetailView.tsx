import { Link, Route, Switch, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBoardDetailDummy } from "../../../../dummy/get-dummy";
import PostView from "../PostView/PostView";
import BoardView from "../BoardView/BoardView";
import RightBar from "../TotalView/RightBar";
import { getBoardAPI } from "../../../../API/boardAPI";

interface BoardParams {
  boardId: string;
  postId: string;
}

interface BoardData {
  id: number;
  title: string;
  description: string;
}

const DetailView = () => {
  const [boardDetail, setBoardDetail] = useState<BoardData>({
    id: 0,
    title: "",
    description: "",
  });

  const params: BoardParams = useParams();

  useEffect(() => {
    getBoardAPI().then((response) => {
      const boardDetail = response.find(
        (board: any) => board.id === Number(params.boardId)
      );
      setBoardDetail(boardDetail);
    });
  }, [params.boardId]);

  return (
    <>
      <div className="BoardView">
        <div id="container">
          <div className="BoardView__main">
            <div className="BoardView__title">{boardDetail.title}</div>
            <Switch>
              <Route exact path={`/:boardId`} component={BoardView} />
              <Route exact path={`/:boardId/p/:pageId`} component={BoardView} />
              <Route path={`/:boardId/:postId`} component={PostView} />
            </Switch>
          </div>
          <RightBar />
        </div>
      </div>
    </>
  );
};

export default DetailView;
