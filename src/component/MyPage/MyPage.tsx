import Password from "./Account/Password";
import MyPageHome from "./MyPageHome";
import { Route, Switch } from "react-router-dom";

const MyPage = () => {
  return (
    <div className="Home">
      <Switch>
        <Route path="/my/password" component={Password} exact />
        <Route path="/my" component={MyPageHome} />
      </Switch>
    </div>
  );
};

export default MyPage;
