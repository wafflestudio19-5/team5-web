import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="Footer">
      <ul className={"links"}>
        <li>
          <Link to={"/"}>이용약관</Link>
        </li>
        <li className={"policy"}>
          <Link to={"/"}>개인정보처리방침</Link>
        </li>
        <li>
          <Link to={"/"}>커뮤니티이용규칙</Link>
        </li>
        <li>
          <Link to={"/"}>공지사항</Link>
        </li>
        <li>
          <Link to={"/"}>문의하기</Link>
        </li>
        <li className={"copyright"}>
          <Link to={"/"}>© 에브리타임</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
