import { Link } from "react-router-dom";
import { useState } from "react";

const RightBar = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className={"RightBarWrapper"}>
      <input
        className={"searchBar"}
        placeholder={"전체 게시판의 글을 검색하세요!"}
      />
      <div className={"cardNow"}>
        <h3 className={"board-name"}>실시간 인기 글</h3>
        <ul className={"board"}>
          <li className={"board-item"}>
            <Link to={"/"}>
              <p className={"card-title"}>제목</p>
              <p className={"card-content"}>내용</p>
              <div className={"card-information"}>
                <h4>게시판종류</h4>
                <ul className={"status"}>
                  <li className={"vote_active"}>10</li>
                  <li className={"comment_active"}>10</li>
                </ul>
              </div>
            </Link>
          </li>
          <li className={"board-item"}>
            <Link to={"/"}>
              <p className={"card-title"}>제목</p>
              <p className={"card-content"}>내용</p>
              <div className={"card-information"}>
                <h4>게시판종류</h4>
                <ul className={"status"}>
                  <li className={"vote_active"}>10</li>
                  <li className={"comment_active"}>10</li>
                </ul>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <div className={"cardHot"}>
        <h3 className={"board-name"}>
          <Link to={"/"}>HOT 게시물</Link>
          <Link to={"/"}>
            <span>더보기</span>
          </Link>
        </h3>
        <ul className={"board"}>
          <li className="board-item">
            <Link to={`/`}>
              <p>내용</p>
            </Link>
            <time>시간</time>
          </li>
          <li className="board-item">
            <Link to={`/`}>
              <p>내용</p>
            </Link>
            <time>시간</time>
          </li>
          <li className="board-item">
            <Link to={`/`}>
              <p>내용</p>
            </Link>
            <time>시간</time>
          </li>
          <li className="board-item">
            <Link to={`/`}>
              <p>내용</p>
            </Link>
            <time>시간</time>
          </li>
        </ul>
      </div>
      <div className={"cardBest"}>
        <h3 className={"board-name"}>
          <Link to={"/"}>BEST 게시판</Link>
          <Link to={"/"}>
            <span>더보기</span>
          </Link>
        </h3>
      </div>
      <div className={"cardLecture"}>
        <h3 className={"board-name"}>
          <Link to={"/"}>최근 강의평</Link>
          <Link to={"/"}>
            <span>더보기</span>
          </Link>
        </h3>
        <ul className={"board"}>
          <li className={"board-item"}>
            <Link to={"/"}>
              <span className={"star"}>
                <span className={"onStar"} />
              </span>
              <br />
              <p className={"card-title"}>제목</p>
              <p className={"card-content"}>내용</p>
            </Link>
          </li>
          <li className={"board-item"}>
            <Link to={"/"}>
              <span className={"star"}>
                <span className={"onStar"} />
              </span>
              <br />
              <p className={"card-title"}>제목</p>
              <p className={"card-content"}>내용</p>
            </Link>
          </li>
          <li className={"board-item"}>
            <Link to={"/"}>
              <span className={"star"}>
                <span className={"onStar"} />
              </span>
              <br />
              <p className={"card-title"}>제목</p>
              <p className={"card-content"}>내용</p>
            </Link>
          </li>
          <li className={"board-item"}>
            <Link to={"/"}>
              <span className={"star"}>
                <span className={"onStar"} />
              </span>
              <br />
              <p className={"card-title"}>제목</p>
              <p className={"card-content"}>내용</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RightBar;
