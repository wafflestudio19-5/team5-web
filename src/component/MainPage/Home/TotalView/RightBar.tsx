import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { hotItemType, liveTopItemType } from "../../../../interface/interface";
import { getHotAPI, getLiveTopAPI, getPostAPI } from "../../../../API/postAPI";
import { time } from "../../../../function/timeCal";
import { toast } from "../../../Toast/ToastManager";

interface liveTopItems extends Array<liveTopItemType> {}

const RightBar = () => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const [liveTop, setLiveTop] = useState<liveTopItems>([]);
  const [hotPreView, setHotPreView] = useState<Array<hotItemType>>([]);
  const search = (input: string) => {
    history.push(`/s/${input}`);
  };
  useEffect(() => {
    getLiveTopAPI().then((res) => setLiveTop(res));
    getHotAPI().then((res) => setHotPreView(res));
  }, []);

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
            if (searchValue.length > 0) {
              search(searchValue);
            } else {
              toast.show({
                title: "오류",
                content: "검색어를 한 글자 이상 입력하세요",
                duration: 5000,
              });
            }
          }
        }}
      />

      <div className={"cardB"}>
        <h3 className={"board-name"}>실시간 인기 글</h3>
        <ul className={"board"}>
          {liveTop.map((postItem) => (
            <Link to={`/${postItem.board.id}/${postItem.id}`} key={postItem.id}>
              <li className={"board-item"} key={postItem.id}>
                {postItem.board.title_exist && (
                  <p className={"card-title"}>{postItem.title}</p>
                )}
                <p className={"card-content"}>{postItem.content}</p>
                <div className={"card-information"}>
                  <h4>{postItem.board.title}</h4>
                  <ul className={"status"}>
                    <li className={"vote_active"}>{postItem.num_of_likes}</li>
                    <li className={"comment_active"}>
                      {postItem.num_of_comments}
                    </li>
                  </ul>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="cardA">
        <h3 key="label" className="board-name">
          <Link to={`/hot`}>HOT 게시물</Link>
        </h3>
        <ul className="board">
          {hotPreView.map((postItem) => (
            <Link to={`/${postItem.board.id}/${postItem.id}`} key={postItem.id}>
              <li key={postItem.id} className="board-item">
                <p>{postItem.title_content}</p>
                <time>{time(postItem.created_at)}</time>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className={"cardB"}>
        <h3 className={"board-name"}>
          <Link to={"/best"}>BEST 게시판</Link>
          <Link to={"/best"}>
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
          <Link to={"/"}>
            <li className={"board-item"}>
              <span className={"star"}>
                <span className={"onStar"} />
              </span>
              <br />
              <p className={"card-title"}>제목</p>
              <p className={"card-content"}>내용</p>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default RightBar;
