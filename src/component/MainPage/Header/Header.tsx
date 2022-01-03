import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="Header">
      <div className="Header__wrapper">
        <div className="Header__logo">
          <Link to="/">
            <img
              src={'https://everytime.kr/images/new/nav.logo.png'}
              className={'logo_img'}
            />
          </Link>
          <div className={'title__wrapper'}>
            <span className={'Header__title'}>에브리타임</span>
            <span className={'Header__schoolName'}>서울대</span>
          </div>
        </div>
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
        <div className="Header__account">
          <Link to="/message">
            <div className={'message'}></div>
          </Link>
          <Link to="/my">
            <div className={'my'}></div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
