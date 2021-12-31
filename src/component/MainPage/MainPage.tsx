import { Route, Switch } from "react-router-dom";
import Header from "./Header/Header";
import Home from "./Home/Home";

const MainPage = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/timetable" />
        <Route path="/lecture" />
        <Route path="/" component={Home} />
      </Switch>
    </>
  );
};

export default MainPage;
