import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./Header/Header";
import Home from "./Home/Home";
import Footer from "./Footer/Footer";
import Login from "../AuthPage/Login/Login";
import MyPage from "../MyPage/MyPage";

import TimeTable from "./TimeTable/TimeTable";

const MainPage = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/my" component={MyPage} />
        <Route path="/timetable" component={TimeTable} />
        <Route path="/lecture" />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </>
  );
};

export default MainPage;
