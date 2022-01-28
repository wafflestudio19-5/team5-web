import { Route, Switch, useParams } from "react-router-dom";
import RightBar from "../TotalView/RightBar";
import HotArticles from "./HotArticles";

const MyDetailView = () => {
  return (
    <>
      <div className="BoardView">
        <div id="container">
          <div className="BoardView__main">
            <Switch>
              <Route exact path={"/hot"} component={HotArticles} />
            </Switch>
          </div>
          <RightBar />
        </div>
      </div>
    </>
  );
};

export default MyDetailView;
