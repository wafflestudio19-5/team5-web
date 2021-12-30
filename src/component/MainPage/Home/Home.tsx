import { Redirect, Route, Switch } from "react-router-dom";
import SubMenu from "./SubMenu/SubMenu";
import TotalView from "./TotalView/TotalView";
import Board from "./Board/Board";
import PostView from "./PostView/PostView";

const Home = () => {
  return (
    <div className="Home">
      <SubMenu />
      <Switch>
        <Route path="/" component={TotalView} exact />
        <Route path="/:boardId/:postId" component={Board} />
        <Route path="/:boardId" component={Board} />
        {/*<Redirect to="/" />*/}
      </Switch>
    </div>
  );
};

export default Home;
