import { useEffect, useState } from "react";
import { getBoardDetailDummy } from "../../../dummy/get-dummy";
import RightMenu from "../RightMenu/RightMenu";

interface BoardViewParams {
  match: {
    params: {
      boardId: string;
    };
  };
}

interface boardDetailDummyItem {
  id: string;
  writer: string;
  title: string;
  content: string;
}

interface boardDetailDummy {
  id: string;
  name: string;
  data: boardDetailDummyItem[];
}

const BoardView = ({ match }: BoardViewParams) => {
  const [boardDetail, setBoardDetail] = useState<boardDetailDummy>({
    id: "",
    name: "",
    data: [],
  });
  useEffect(() => {
    setBoardDetail(getBoardDetailDummy(match.params.boardId));
  });

  return (
    <div className="BoardView">
      <div id="container">
        <div className={"rightSide"}>
          <RightMenu />
        </div>
        <div className="BoardView__main">
          <div className="BoardView__title">{boardDetail.name}</div>
          <div className="BoardView__writeArticle"></div>
          <ul className="BoardView__list">
            {boardDetail.data.map((item) => (
              <li key={item.id} className="BoardView__item">
                <div>
                  {item.title} <br /> {item.content}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
