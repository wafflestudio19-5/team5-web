import { Route, Switch } from "react-router-dom";
import SubMenu from "./SubMenu/SubMenu";
import TotalView from "./TotalView/TotalView";
import DetailView from "./DetailView/DetailView";
import SearchDetailView from "./BoardView/SearchDetailView";
import MyDetailView from "./MyPostsView/MyDetailView";
import HotBestDetailView from "./HotBestView/HotBestDetailView";

const Home = () => {
  return (
    <div className="Home">
      <SubMenu />
      <Switch>
        <Route path="/" component={TotalView} exact />
        <Route path="/s/:searchId" component={SearchDetailView} exact />
        <Route path="/hot" component={HotBestDetailView} exact />
        <Route path="/best" component={HotBestDetailView} exact />
        <Route path={"/my" + ":myMenu"} component={MyDetailView} />
        <Route path="/:boardId" component={DetailView} />
      </Switch>
    </div>
  );
};

export default Home;
