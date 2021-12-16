import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="Header">
      <div className="Header__wrapper">
        <div className="Header__logo"></div>
        <div className="Header__account">쪽지와정보</div>
        <ul className="Header__menu">
          <li className="active">
            <Link to="/">게시판</Link>
          </li>
          <li>
            <Link to="/timetable">시간표</Link>
          </li>
          <li>
            <Link to="/lecture">강의평가</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
