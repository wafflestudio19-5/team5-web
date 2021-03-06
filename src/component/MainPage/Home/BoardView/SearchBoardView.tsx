import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { getPostWithURLAPI, searchPostAPI } from "../../../../API/postAPI";
import { postListType } from "../../../../interface/interface";
import { toast } from "../../../Toast/ToastManager";

const SearchBoardView = () => {
  const params = useParams() as paramsType;
  const history = useHistory();

  const [postList, setPostList] = useState<postListType>({
    count: 0,
    next: null,
    previous: null,
    results: [],
    title_exist: true,
  });
  const [pageNum, setPageNum] = useState<number>(1);
  const [reloading, setReloading] = useState<boolean>(true);

  interface paramsType {
    searchId: string;
    pageId?: string;
  }

  if (params.pageId) {
    if (Number(params.pageId) !== pageNum) {
      setPageNum(Number(params.pageId));
    }
  }

  const getPostWithPage = (page: number) => {
    const searchValue = params.searchId;
    searchPostAPI(searchValue, 10 * (page - 1)).then((response) =>
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
  }, [reloading]);

  const getURL = (input: string | null) => {
    if (input) {
      const whereToSlice = input.indexOf("/", 8);
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
      {postList.results.length == 0 ? (
        <ul className="BoardView__list">
          <li className="BoardView__noItem">아직 글이 없습니다.</li>
        </ul>
      ) : (
        <>
          <ul className="BoardView__list">
            {postList.results.map((item) => (
              <li key={item.id} className="BoardView__item">
                <Link to={`/${params.searchId}/${item.id}`}>
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
                  history.push(`/${params.searchId}/p/${pageNum - 1}`);
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
                  history.push(`/${params.searchId}/p/${pageNum + 1}`);
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

export default SearchBoardView;
