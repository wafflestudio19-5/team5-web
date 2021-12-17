import { Redirect, Route, Switch } from "react-router-dom";
import SubMenu from "./SubMenu/SubMenu";
import TotalView from "./TotalView/TotalView";
import BoardView from "./BoardView/BoardView";
import PostView from "./PostView/PostView";

const Home = () => {
  return (
    <div className="Home">
      <SubMenu />
      <Switch>
        <Route path="/" component={TotalView} exact />
        <Route path="/:boardId/:postId" component={PostView} />
        <Route path="/:boardId" component={BoardView} />
        {/*<Redirect to="/" />*/}
      </Switch>
    </div>
  );
};

export default Home;
