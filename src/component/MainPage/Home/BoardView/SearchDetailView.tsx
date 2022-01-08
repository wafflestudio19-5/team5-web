import { Link, Route, Switch, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBoardDetailDummy } from "../../../../dummy/get-dummy";
import PostView from "../PostView/PostView";
import BoardView from "../BoardView/BoardView";
import RightBar from "../TotalView/RightBar";
import SearchBoardView from "./SearchBoardView";

interface BoardParams {
  searchId: string;
  postId: string;
}

interface boardDetailDummyItem {
  id: string;
  writer: string;
  title: string;
  content: string;
}

const SearchDetailView = () => {
  const params: BoardParams = useParams();

  return (
    <>
      <div className="BoardView">
        <div id="container">
          <div className="BoardView__main">
            <div className="BoardView__title">
              "{params.searchId}"에 대한 검색 결과입니다
            </div>
            <Switch>
              <Route exact path={`/s/:searchId`} component={SearchBoardView} />
              <Route
                exact
                path={`/s/:searchId/p/:pageId`}
                component={SearchBoardView}
              />
            </Switch>
          </div>
          <RightBar />
        </div>
      </div>
    </>
  );
};

export default SearchDetailView;
