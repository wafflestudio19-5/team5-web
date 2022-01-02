import "./App.css";
import "./scss/main.scss";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./component/MainPage/Header/Header";
import Home from "./component/MainPage/Home/Home";
import Footer from "./component/MainPage/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux";
import AuthPage from "./component/AuthPage/AuthPage";
import MainPage from "./component/MainPage/MainPage";
import Login from "./component/AuthPage/Login/Login";
import { useEffect } from "react";
import { loadToken } from "./function/localStorage";
import { login } from "./redux/authorization";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (loadToken()) {
      dispatch(login(loadToken())); // 새로고침 시 로컬스토리지에 있는 토큰 확인
    }
  }, []);
  const auth = useSelector((state: RootState) => state.authorization).token;
  return (
    <div className="App">
      {auth ? (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={MainPage} />
          <Redirect to="/" />
        </Switch>
      ) : (
        <AuthPage />
      )}
    </div>
  );
}

export default App;
