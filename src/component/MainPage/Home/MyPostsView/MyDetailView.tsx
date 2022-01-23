import { Route, Switch, useParams } from "react-router-dom";
import RightBar from "../TotalView/RightBar";
import myArticles from "./MyArticles";

const MyDetailView = () => {
  return (
    <>
      <div className="BoardView">
        <div id="container">
          <div className="BoardView__main">
            <Switch>
              <Route exact path={"/my" + ":myMenu"} component={myArticles} />
              <Route
                exact
                path={"/my" + ":myMenu/p/:pageId"}
                component={myArticles}
              />
            </Switch>
          </div>
          <RightBar />
        </div>
      </div>
    </>
  );
};

export default MyDetailView;
