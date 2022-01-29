import { Redirect, Route, Switch } from "react-router-dom";
import Lecture from "./Lecture";
import LectureView from "./LectureView/LectureView";
import LecturePoint from "./LecturePoint";

const LectureRoute = () => {
  return (
    <Switch>
      <Route path="/lecture/view/:id" component={LectureView} exact />
      <Route path="/lecture/point" component={LecturePoint} exact />
      <Route path="/lecture" component={Lecture} />
      <Redirect to="/lecture" />
    </Switch>
  );
};
export default LectureRoute;
