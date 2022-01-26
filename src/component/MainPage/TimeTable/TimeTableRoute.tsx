import { Redirect, Route, Switch } from "react-router-dom";
import TimeTable from "./TimeTable";

const TimeTableRoute = () => {
  return (
    <Switch>
      <Route
        path="/timetable/:year?/:season?/:scheduleId?"
        component={TimeTable}
      />
      <Redirect to="/timetable" />
    </Switch>
  );
};
export default TimeTableRoute;
