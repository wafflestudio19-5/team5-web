import Password from "./Account/Password";
import Email from "./Account/Email";
import MyPageHome from "./MyPageHome";
import Nickname from "./Community/Nickname";
import Withdrawal from "./ETC/Withdrawal";
import { Route, Switch } from "react-router-dom";

const MyPage = () => {
  return (
    <div className="Home">
      <Switch>
        <Route path="/my/password" component={Password} exact />
        <Route path="/my/email" component={Email} exact />
        <Route path="/my/nickname" component={Nickname} exact />
        <Route path="/my/withdrawal" component={Withdrawal} exact />
        <Route path="/my" component={MyPageHome} />
      </Switch>
    </div>
  );
};

export default MyPage;
