import { Link, Route, Switch, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBoardDetailDummy } from "../../../dummy/get-dummy";
import RightMenu from "../RightMenu/RightMenu";
import PostView from "../PostView/PostView";
import BoardView from "./BoardView/BoardView";

interface BoardParams {
  match: {
    params: {
      boardId: string;
      postId: string;
    };
  };
}

interface boardDetailDummy {
  id: string;
  name: string;
  data: boardDetailDummyItem[];
}

interface boardDetailDummyItem {
  id: string;
  writer: string;
  title: string;
  content: string;
}

const Board = ({ match }: BoardParams) => {
  const [boardDetail, setBoardDetail] = useState<boardDetailDummy>({
    id: "",
    name: "",
    data: [],
  });

  useEffect(() => {
    setBoardDetail(getBoardDetailDummy(match.params.boardId));
  }, [setBoardDetail, match.params.boardId]);

  return (
    <>
      <div className="BoardView">
        <div id="container">
          <div className={"rightSide"}>
            <RightMenu />
          </div>
          <div className="BoardView__main">
            <div className="BoardView__title">{boardDetail.name}</div>
            <Switch>
              <Route
                exact
                path={`/${match.params.boardId}`}
                component={BoardView}
              />
              <Route path={`/:boardId/:postId`} component={PostView} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
