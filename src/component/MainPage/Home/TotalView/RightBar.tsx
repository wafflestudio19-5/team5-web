import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLiveTopAPI, getPostAPI } from "../../../../API/postAPI";
import TotalViewItem from "./TotalViewItem";
import { boardItemType, postItemType } from "../../../../interface/interface";
import { time } from "../../../../function/timeCal";

const RightBar = () => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const [liveTopPost, setLiveTopPost] = useState([]);
  const [hotPost, setHotPost] = useState<postItemType[]>([]);

  useEffect(() => {
    getPostAPI("hot", 0, 10).then((res) => {
      setHotPost(res.results);
    });
  }, []);

  useEffect(() => {
    getLiveTopAPI().then((res) => {
      setLiveTopPost(res);
      console.log(res);
    });
  }, []);

  const search = (input: string) => {
    history.push(`/s/${input}`);
  };
  return (
    <div className={"RightBarWrapper"}>
      <input
        className={"searchBar"}
        placeholder={"전체 게시판의 글을 검색하세요!"}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            search(searchValue);
          }
        }}
      />
      <div className={"cardNow"}>
        <h3 className={"board-name"}>실시간 인기 글</h3>
        <ul className={"board"}>
          {liveTopPost.length === 0 ? (
            <ul className={"board"}>
              {" "}
              <li> 아직 실시간 인기글이 없습니다.</li>
            </ul>
          ) : (
            <ul className={"board"}>
              {liveTopPost.map((item: postItemType) => (
                <li className={"board-item"} key={item.id}>
                  <Link to={`/${item.id}`}>
                    <p className={"card-title"}>{item.title}</p>
                    <p className={"card-content"}>{item.content}</p>
                    <div className={"card-information"}>
                      <h4>게시판종류</h4>
                      <ul className={"status"}>
                        <li className={"vote_active"}>{item.num_of_likes}</li>
                        <li className={"comment_active"}>
                          {item.num_of_comments}
                        </li>
                      </ul>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </ul>
      </div>
      <div className={"cardHot"}>
        <h3 className={"board-name"}>
          <Link to={"/hot"}>HOT 게시물</Link>
          <Link to={"/hot"}>
            <span>더보기</span>
          </Link>
        </h3>

        {hotPost.length === 0 ? (
          <ul className={"board"}>
            {" "}
            <li> 아직 HOT 게시물이 없습니다.</li>
          </ul>
        ) : (
          <ul className={"board"}>
            {hotPost.map((item: postItemType) => (
              <li className="board-item" key={item.id}>
                <Link to={`/hot/${item.id}`}>
                  <p>{item.title}</p>
                </Link>
                <time className={"hotPostTime"}>{time(item.created_at)}</time>
              </li>
            ))}
          </ul>
        )}
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
