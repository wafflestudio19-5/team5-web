import { Redirect, Route, Switch } from "react-router-dom";
import SubMenu from "./SubMenu/SubMenu";
import TotalView from "./TotalView/TotalView";
import DetailView from "./DetailView/DetailView";
import PostView from "./PostView/PostView";

const Home = () => {
  return (
    <div className="Home">
      <SubMenu />
      <Switch>
        <Route path="/" component={TotalView} exact />
        <Route path="/:boardId/:postId" component={DetailView} />
        <Route path="/:boardId" component={DetailView} />
      </Switch>
    </div>
  );
};

export default Home;
