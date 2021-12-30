import "./App.css";
import "./scss/main.scss";
import { Route, Switch } from "react-router-dom";
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
      dispatch(login(loadToken()));
    }
  }, []);
  const auth = useSelector((state: RootState) => state.authorization).token;
  return (
    <div className="App">
      {auth ? (
        <>
          <Header />
          <Switch>
            <Route path="/timetable" />
            <Route path="/lecture" />
            <Route path="/asdasdf" component={MainPage} />
            <Route path="/login" component={Login} />
            <Route path="/" component={Home} />
          </Switch>
          {/*<Footer />*/}
        </>
      ) : (
        <AuthPage />
      )}
    </div>
  );
}

export default App;
