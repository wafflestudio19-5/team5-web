import { Route, Switch } from "react-router-dom";
import Header from "./Header/Header";
import Home from "./Home/Home";
import Footer from "./Footer/Footer";
import Login from "../AuthPage/Login/Login";
import MyPage from "../MyPage/MyPage";
import TimeTableRoute from "./TimeTable/TimeTableRoute";
import LectureRoute from "./Lecture/LectureRoute";
import Message from "./Message/Message";

const MainPage = () => {
  return (
    <>
      <Switch>
        <Route path="/:state" component={Header} />
        <Route path="/" component={Header} />
      </Switch>
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/my" component={MyPage} />
        <Route path="/message" component={Message} />
        <Route path="/timetable" component={TimeTableRoute} />
        <Route path="/lecture" component={LectureRoute} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </>
  );
};

export default MainPage;
