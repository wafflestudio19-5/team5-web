import { Route, Switch } from 'react-router-dom';
import Header from './Header/Header';
import Home from './Home/Home';
import Footer from './Footer/Footer';

const MainPage = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/timetable" />
        <Route path="/lecture" />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </>
  );
};

export default MainPage;
