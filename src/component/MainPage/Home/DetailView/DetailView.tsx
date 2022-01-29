import { Link, Route, Switch, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBoardDetailDummy } from "../../../../dummy/get-dummy";
import PostView from "../PostView/PostView";
import BoardView from "../BoardView/BoardView";
import RightBar from "../TotalView/RightBar";
import { getBoardAPI } from "../../../../API/boardAPI";
import { BoardType, SubBoardType } from "../../../../interface/interface";

interface BoardParams {
  boardId: string;
  postId: string;
}

const emptyBoard = {
  id: -1,
  title: "",
  description: "",
  anonym_enabled: false,
  is_market: false,
  title_enabled: true,
  question_enabled: false,
  notice_enabled: false,
  board_type: 0,
  sub_boards: [],
  created_at: "",
  manager: null,
  head_board: null,
};

const DetailView = () => {
  const [boardDetail, setBoardDetail] = useState<BoardType>(emptyBoard);
  const [subId, setSubId] = useState<number>(-1);

  const params: BoardParams = useParams();

  useEffect(() => {
    getBoardAPI().then((response) => {
      const loadedBoard = response.find(
        (board: any) => board.id === Number(params.boardId)
      );
      if (loadedBoard) {
        setBoardDetail(loadedBoard);
        if (loadedBoard.sub_boards.length > 0) {
          setSubId(loadedBoard.sub_boards[0].id);
        }
      } else {
        setBoardDetail(emptyBoard);
      }
    });
  }, [params.boardId]);

  return (
    <>
      <div className="BoardView">
        <div id="container">
          <div className="BoardView__main">
            <div className="BoardView__title">{boardDetail.title}</div>
            {boardDetail.sub_boards.length > 0 ? (
              <>
                <div className="BoardView__subs">
                  {boardDetail.sub_boards.map((sub) => {
                    return (
                      <div
                        className={`BoardView__subboard ${
                          subId === sub.id ? "selected" : ""
                        }`}
                        onClick={() => {
                          setSubId(sub.id);
                        }}
                      >
                        {sub.title}
                      </div>
                    );
                  })}
                </div>
                <Switch>
                  <Route
                    exact
                    path={`/:boardId`}
                    render={() => <BoardView subId={subId} />}
                  />
                  <Route
                    exact
                    path={`/:boardId/p/:pageId`}
                    render={() => <BoardView subId={subId} />}
                  />
                  <Route path={`/:boardId/:postId`} component={PostView} />
                </Switch>
              </>
            ) : (
              <Switch>
                <Route exact path={`/:boardId`} component={BoardView} />
                <Route
                  exact
                  path={`/:boardId/p/:pageId`}
                  component={BoardView}
                />
                <Route path={`/:boardId/:postId`} component={PostView} />
              </Switch>
            )}
          </div>
          <RightBar />
        </div>
      </div>
    </>
  );
};

export default DetailView;
