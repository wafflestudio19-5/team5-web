import "./App.css";
import "./scss/main.scss";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./component/Header/Header";
import Home from "./component/Home/Home";
import Footer from "./component/Footer/Footer";
function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/timetable" />
        <Route path="/lecture" />
        {/*<Redirect to="/" />*/}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
