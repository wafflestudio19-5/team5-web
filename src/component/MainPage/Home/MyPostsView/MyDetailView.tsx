import exp from "constants";
import { Route, Switch } from "react-router-dom";
import BoardView from "../BoardView/BoardView";
import PostView from "../PostView/PostView";
import RightBar from "../TotalView/RightBar";

const MyDetailView = () => {
  return (
    <>
      <div className="BoardView">
        <div id="container">
          <div className="BoardView__main">
            {/*<Switch>*/}
            {/*  <Route exact path={`/:boardId`} component={BoardView} />*/}
            {/*  <Route exact path={`/:boardId/p/:pageId`} component={BoardView} />*/}
            {/*</Switch>*/}
          </div>
          <RightBar />
        </div>
      </div>
    </>
  );
};

export default MyDetailView;
