import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { getMyContentsAPI } from "../../../../API/postAPI";
import { postListType } from "../../../../interface/interface";

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
  const [reloading, setReloading] = useState<boolean>(true);

  interface paramsType {
    myMenu: string;
    pageId?: string;
  }

  if (params.pageId) {
    if (Number(params.pageId) !== pageNum) {
      setPageNum(Number(params.pageId));
    }
  }

  const getPostWithPage = (page: number) => {
    getMyContentsAPI(params.myMenu, 10 * (page - 1)).then((response) =>
      setPostList(response)
    );
  };

  useEffect(() => {
    console.log(params.myMenu);
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
      <div className="BoardView__title">
        {params.myMenu === "post"
          ? "내가 쓴 글"
          : params.myMenu === "scrap"
          ? "내 스크랩"
          : "댓글 단 글"}
      </div>
      {postList.results.length === 0 ? (
        <ul className="BoardView__list">
          <li className="BoardView__noItem">아직 글이 없습니다.</li>
        </ul>
      ) : (
        <>
          <ul className="BoardView__list">
            {postList.results.map((item) => (
              <li key={item.id} className="BoardView__item">
                <Link to={`/${params.myMenu}/${item.id}`}>
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
                onClick={() => {
                  history.push(`/my${params.myMenu}/p/${pageNum - 1}`);
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
                  history.push(`/my${params.myMenu}/p/${pageNum + 1}`);
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