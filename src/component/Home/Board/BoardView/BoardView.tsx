import { useEffect, useState } from "react";
import { getBoardDetailDummy } from "../../../../dummy/get-dummy";
import { Link } from "react-router-dom";

interface BoardParams {
  match: {
    path: string;
  };
}

interface boardDetailDummy {
  id: string;
  name: string;
  data: boardDetailDummyItem[];
}

interface boardDetailDummyItem {
  id: string;
  writer: string;
  title: string;
  content: string;
}

const BoardView = ({ match }: BoardParams) => {
  const [boardDetail, setBoardDetail] = useState<boardDetailDummy>({
    id: "",
    name: "",
    data: [],
  });
  useEffect(() => {
    setBoardDetail(getBoardDetailDummy(match.path.slice(1)));
  }, [setBoardDetail, match.path]);
  return (
    <>
      <div className={"BoardView__writePost"}></div>
      <ul className="BoardView__list">
        {boardDetail.data.map((item) => (
          <li key={item.id} className="BoardView__item">
            <Link to={`${boardDetail.id}/${item.id}`}>
              {item.title} <br /> {item.content}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BoardView;
