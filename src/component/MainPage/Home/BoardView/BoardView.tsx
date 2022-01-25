import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { getPostAPI } from "../../../../API/postAPI";
import { postListType } from "../../../../interface/interface";
import Write from "./Write";
import { time } from "../../../../function/timeCal";

const BoardView = () => {
  const params = useParams() as paramsType;
  const history = useHistory();

  const [postList, setPostList] = useState<postListType>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [pageNum, setPageNum] = useState<number>(1);
  const [showForm, setShowForm] = useState<boolean>(false);
  const openWrite = () => setShowForm(!showForm);
  const [searchValue, setSearchValue] = useState("");
  const search = (input: string) => {
    history.push(`/s/${input}`);
  };

  const [reloading, setReloading] = useState<boolean>(true);

  interface paramsType {
    boardId: string;
    pageId?: string;
  }

  if (params.pageId) {
    if (Number(params.pageId) !== pageNum) {
      setPageNum(Number(params.pageId));
    }
  }

  const getPostWithPage = (page: number) => {
    getPostAPI(Number(params.boardId), 10 * (page - 1)).then((response) =>
      setPostList(response)
    );
  };

  useEffect(() => {
    setReloading(true);
  }, [params]);

  useEffect(() => {
    if (reloading) {
      getPostWithPage(Number(pageNum));
      setReloading(false);
    }
  }, [params, reloading]);

  return (
    <>
      {showForm ? (
        <Write
          boardId={Number(params.boardId)}
          setReloading={setReloading}
          openWrite={openWrite}
        />
      ) : (
        <button className={"BoardView__writePost"} onClick={openWrite}>
          새 글을 작성해주세요!
        </button>
      )}

      {postList.results.length === 0 ? (
        <ul className="BoardView__list">
          <li className="BoardView__noItem">아직 글이 없습니다.</li>
        </ul>
      ) : (
        <>
          <ul className="BoardView__list">
            {postList.results.map((item) => (
              <li key={item.id} className="BoardView__item">
                <Link to={`/${params.boardId}/${item.id}`}>
                  <div className={"wrapper"}>
                    <h2 className={"medium"}>{item.title}</h2>
                    <p className={"small"}>{item.content}</p>
                    <p className={"small info"}>
                      <time>{time(item.created_at)}</time>
                      <div className={"writer"}>{item.writer}</div>
                    </p>
                  </div>
                  <ul className="status">
                    <li className={"vote_active"}>{item.num_of_likes}</li>
                    <li className={"comment_active"}>{item.num_of_comments}</li>
                  </ul>
                </Link>
              </li>
            ))}
          </ul>
          <div className="BoardView__bottomBar">
            <input
              className={"searchBarMini"}
              placeholder={"게시판의 글을 검색하세요!"}
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
            {postList.previous && (
              <button
                className="BoardView__previous"
                onClick={() => {
                  history.push(`/${params.boardId}/p/${pageNum - 1}`);
                  setPageNum(pageNum - 1);
                }}
              >
                이전
              </button>
            )}
            {postList.next && (
              <button
                className="BoardView__next"
                onClick={() => {
                  history.push(`/${params.boardId}/p/${pageNum + 1}`);
                  setPageNum(pageNum + 1);
                }}
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
