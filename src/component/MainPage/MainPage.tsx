import { Route, Switch } from "react-router-dom";
import Header from "./Header/Header";
import Home from "./Home/Home";
import Footer from "./Footer/Footer";
import Login from "../AuthPage/Login/Login";
import MyPage from "../MyPage/MyPage";

const MainPage = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/my" component={MyPage} />
        <Route path="/timetable" />
        <Route path="/lecture" />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </>
  );
};

export default MainPage;
