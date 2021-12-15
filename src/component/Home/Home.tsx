import { Redirect, Route, Switch } from "react-router-dom";
import SubMenu from "./SubMenu/SubMenu";
import TotalView from "./TotalView/TotalView";
import BoardView from "./BoardView/BoardView";

const Home = () => {
  return (
    <div className="Home">
      <SubMenu />
      <Switch>
        <Route path="/" component={TotalView} />
        <Route path="/:id" component={BoardView} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default Home;
