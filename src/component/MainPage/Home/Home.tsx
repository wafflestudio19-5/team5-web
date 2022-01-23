import { Route, Switch } from "react-router-dom";
import SubMenu from "./SubMenu/SubMenu";
import TotalView from "./TotalView/TotalView";
import DetailView from "./DetailView/DetailView";
import SearchDetailView from "./BoardView/SearchDetailView";
import MyArticles from "./MyPostsView/MyArticles";
import BoardView from "./BoardView/BoardView";
import MyDetailView from "./MyPostsView/MyDetailView";

const Home = () => {
  return (
    <div className="Home">
      <SubMenu />
      <Switch>
        <Route path="/" component={TotalView} exact />
        {/*<Route path="/myarticle" component={MyArticles} exact />*/}
        {/*<Route exact path={`/myarticle/p/:pageId`} component={MyArticles} />*/}
        <Route path="/s/:searchId" component={SearchDetailView} exact />
        <Route path={`/my` + ":boardId"} component={MyDetailView} />
        <Route path="/:boardId" component={DetailView} />
      </Switch>
    </div>
  );
};

export default Home;
