import { Route, Switch, useParams } from "react-router-dom";
import RightBar from "../TotalView/RightBar";
import HotArticles from "./HotArticles";
import BestArticles from "./BestArticles";

const HotBestDetailView = () => {
  return (
    <>
      <div className="BoardView">
        <div id="container">
          <div className="BoardView__main">
            <Switch>
              <Route exact path={"/hot"} component={HotArticles} />
              <Route exact path={"/best"} component={BestArticles} />
            </Switch>
          </div>
          <RightBar />
        </div>
      </div>
    </>
  );
};

export default HotBestDetailView;
