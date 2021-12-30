import { Route, Switch } from "react-router-dom";
import Login from "./Login/Login";
import Lobby from "./Lobby/Lobby";
const AuthPage = () => {
  return (
    <Switch>
      <Route path="/" component={Lobby} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/register" exact />
      <Route path="/:redirectPath" />
    </Switch>
  );
};

export default AuthPage;
