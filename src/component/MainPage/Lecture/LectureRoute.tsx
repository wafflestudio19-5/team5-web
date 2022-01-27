import { Redirect, Route, Switch } from "react-router-dom";
import Lecture from "./Lecture";
import LectureView from "./LectureView/LectureView";

const LectureRoute = () => {
  return (
    <Switch>
      <Route path="/lecture/view/:id" component={LectureView} exact />
      <Route path="/lecture" component={Lecture} />
      <Redirect to="/lecture" />
    </Switch>
  );
};
export default LectureRoute;
