import { useEffect, useState } from "react";
import { getBoardDetailDummy } from "../../../dummy/get-dummy";

interface BoardViewParams {
  match: {
    params: {
      id: string;
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
    setBoardDetail(getBoardDetailDummy(match.params.id));
  });

  return (
    <div className="BoardView">
      <div id="container">
        <div className={"rightSide"}>
          <div className={"sideNow"}>실시간 인기</div>
          <div className={"sideHot"}>핫게</div>
          <div className={"sideBest"}>Best</div>
          <div className={"sideSchool"}>학교 소식</div>
          <div className={"sideLecEval"}>최근 강의평</div>
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
