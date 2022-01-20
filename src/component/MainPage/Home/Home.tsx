import { Redirect, Route, Switch } from "react-router-dom";
import SubMenu from "./SubMenu/SubMenu";
import TotalView from "./TotalView/TotalView";
import DetailView from "./DetailView/DetailView";
import PostView from "./PostView/PostView";
import SearchDetailView from "./BoardView/SearchDetailView";

const Home = () => {
  return (
    <div className="Home">
      <SubMenu />
      <Switch>
        <Route path="/" component={TotalView} exact />
        {/*  my ~~~ */}
        <Route path="/s/:searchId" component={SearchDetailView} exact />
        <Route path="/:boardId" component={DetailView} />
      </Switch>
    </div>
  );
};

export default Home;
