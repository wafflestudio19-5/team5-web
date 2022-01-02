import { Link, Route, Switch, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBoardDetailDummy } from "../../../../dummy/get-dummy";
import RightMenu from "../RightMenu/RightMenu";
import PostView from "../PostView/PostView";
import BoardView from "../BoardView/BoardView";

interface BoardParams {
  boardId: string;
  postId: string;
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

const DetailView = () => {
  const [boardDetail, setBoardDetail] = useState<boardDetailDummy>({
    id: "",
    name: "",
    data: [],
  });

  const params: BoardParams = useParams();

  useEffect(() => {
    const data = getBoardDetailDummy(params.boardId);
    console.log(data);
    if (data) {
      setBoardDetail(data);
    }
  }, [setBoardDetail, params.boardId]);

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
              <Route exact path={`/:boardId`} component={BoardView} />
              <Route path={`/:boardId/:postId`} component={PostView} />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailView;
