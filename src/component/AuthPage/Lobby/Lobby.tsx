import LoginAndRegister from "../../common/LoginAndRegister";
import { Link } from "react-router-dom";

const Lobby = () => {
  return (
    <div className="Lobby">
      <aside className="Lobby__RightBar">
        <div className="Lobby__Login">
          <div className="Lobby__Logo">
            <Link to="/">
              <img
                src="https://everytime.kr/images/about/logo.png"
                alt="에브리타임"
              />
            </Link>
          </div>
          <LoginAndRegister />
        </div>
        <section>
          <ul className="Lobby__UnivList"></ul>
        </section>
      </aside>
      <section className="introduce">
        <div className="wrap">
          <h1>
            대학 생활을 더 편하고 즐겁게,
            <br />
            <strong>에브리타임</strong>
          </h1>
          <div className="stores">
            <a href="https://play.google.com/store/apps/details?id=com.everytime.v2">
              <img
                src="https://everytime.kr/images/about/playstore.png"
                alt="playStore"
              />
            </a>
            <a href="https://apps.apple.com/kr/app/id642416310">
              <img
                src="https://everytime.kr/images/about/appstore.png"
                alt="appStore"
              />
            </a>
          </div>
          <div className="Device__Active">
            <div className="screen">
              <div className="image home" />
              <div className="image timetable" />
              <div className="image board" />
            </div>
          </div>
        </div>
      </section>
      <section className="white">
        <h2>
          350만 대학생을 위한
          <br />
          <strong>국내 1위 대학생 서비스 에브리타임!</strong>
        </h2>
        <div className="paragraph">
          <p>
            시간표 작성, 수업 일정 및 할일 등 편리한 <strong>학업 관리</strong>
            가 가능하고,
            <br />
            학식 등 유용한 <strong>학교 생활 정보</strong> 를 접할 수 있으며,
            <br />
            같은 캠퍼스의 학생들과 소통하는 <strong>익명 커뮤니티</strong>를
            이용할 수 있습니다.
          </p>
        </div>
      </section>
      <section className="community">
        <h2>
          전국 397개 캠퍼스
          <br />
          <strong>재학생 커뮤니티 에브리타임!</strong>
        </h2>
        <div className="paragraph">
          <p>
            학교 인증을 거친 재학생들의 안전한 대화를 위한
            <strong>익명 시스템</strong>과
            <br />
            학생들이 직접 게시판을 개설하여 운영하는
            <strong>커뮤니티 플랫폼</strong>을 통해
            <br />
            많은 대학교에서 가장 활발히 이용하는 재학생 커뮤니티로
            자리잡았습니다.
          </p>
        </div>
        <div className="figure active">
          <div>
            <p className="icon">
              <img
                src="https://everytime.kr/images/about/icon.authorized.png"
                alt="학교인증"
              />
            </p>
            <p className="description">철저한 학교 인증</p>
          </div>
          <div>
            <p className="icon">
              <img
                src="https://everytime.kr/images/about/icon.authorized.png"
                alt="학교인증"
              />
            </p>
            <p className="description">철저한 학교 인증</p>
          </div>
          <div>
            <p className="icon">
              <img
                src="https://everytime.kr/images/about/icon.authorized.png"
                alt="학교인증"
              />
            </p>
            <p className="description">철저한 학교 인증</p>
          </div>
        </div>
      </section>
      <section className="footer">
        <ul className={"links"}>
          <li>
            <Link to={"/"}>이용약관</Link>
          </li>
          <li className={"policy"}>
            <Link to={"/"}>개인정보처리방침</Link>
          </li>
          <li>
            <Link to={"/"}>문의하기</Link>
          </li>
          <li className={"copyright"}>
            <Link to={"/"}>© 에브리타임</Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Lobby;
