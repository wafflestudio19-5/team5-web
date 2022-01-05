import "./App.css";
import "./scss/main.scss";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux";
import AuthPage from "./component/AuthPage/AuthPage";
import MainPage from "./component/MainPage/MainPage";
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
          <Route path="/" component={MainPage} />
        </Switch>
      ) : (
        <AuthPage />
      )}
    </div>
  );
}

export default App;
