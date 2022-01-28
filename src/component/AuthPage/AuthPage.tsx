import { Route, Switch } from "react-router-dom";
import Login from "./Login/Login";
import Lobby from "./Lobby/Lobby";
import Register from "./Register/Register";
import Social from "./Social/Social";
import VerifyEmail from "./Register/VerifyEmail";

const AuthPage = () => {
  return (
    <Switch>
      <Route path="/" component={Lobby} exact />
      <Route path="/login" component={Login} exact />
      <Route path="/register" component={Register} exact />
      <Route path="/verify" component={VerifyEmail} exact />
      <Route path="/social/:platform" component={Social} exact />
      <Route path="/:redirectPath" />
    </Switch>
  );
};

export default AuthPage;
