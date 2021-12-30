import "./App.css";
import "./scss/main.scss";
import { Route, Switch } from "react-router-dom";
import Header from "./component/MainPage/Header/Header";
import Home from "./component/MainPage/Home/Home";
import Footer from "./component/MainPage/Footer/Footer";
import { useSelector } from "react-redux";
import { RootState } from "./redux";
import AuthPage from "./component/AuthPage/AuthPage";
import MainPage from "./component/MainPage/MainPage";
import Login from "./component/AuthPage/Login/Login";

function App() {
  const auth = useSelector((state: RootState) => state.authorization).token;
  console.log("hey");
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
