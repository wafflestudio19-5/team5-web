import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostAPI, getPostWithURLAPI } from "../../../../API/postAPI";
import { postListType } from "../../../../interface/interface";
import Write from "./Write";

const BoardView = () => {
  const [postList, setPostList] = useState<postListType>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [showForm, setShowForm] = useState<boolean>(false);
  const openWrite = () => setShowForm(!showForm);

  interface paramsType {
    boardId: string;
  }

  const params = useParams() as paramsType;
  // useEffect(getBoardDetail, [setBoardDetail, match.path]);
  useEffect(() => {
    getPostAPI(Number(params.boardId)).then((response) =>
      setPostList(response)
    );
  }, [params]);

  const getURL = (input: string | null) => {
    if (input) {
      const whereToSlice = input.indexOf("/", 8);
      console.log(input.slice(whereToSlice));
      return input.slice(whereToSlice);
    } else {
      return "";
    }
  };
  const loadPage = (next: string | null) => {
    getPostWithURLAPI(getURL(next)).then((response) => setPostList(response));
  };

  return (
    <>
      {showForm ? (
        <Write boardId={Number(params.boardId)} />
      ) : (
        <button className={"BoardView__writePost"} onClick={openWrite}>
          새 글을 작성해주세요!
        </button>
      )}

      {postList.results.length == 0 ? (
        <ul className="BoardView__list">
          <li className="BoardView__noItem">아직 글이 없습니다.</li>
        </ul>
      ) : (
        <>
          <ul className="BoardView__list">
            {postList.results.map((item) => (
              <li key={item.id} className="BoardView__item">
                <Link to={`${params.boardId}/${item.id}`}>
                  <div className={"wrapper"}>
                    <h2 className={"medium"}>{item.title}</h2> <br />
                    <p className={"small"}>{item.content}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="BoardView__bottomBar">
            {postList.previous && (
              <button
                className="BoardView__previous"
                onClick={() => loadPage(postList.previous)}
              >
                이전
              </button>
            )}
            {postList.next && (
              <button
                className="BoardView__next"
                onClick={() => loadPage(postList.next)}
              >
                다음
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default BoardView;
