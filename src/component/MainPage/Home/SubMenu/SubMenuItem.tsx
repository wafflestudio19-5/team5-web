import { Link } from "react-router-dom";
import { boardListType } from "../../../../interface/interface";

interface SubMenuItemProps {
  item: boardListType;
}

const SubMenuItem: React.FC<SubMenuItemProps> = ({ item }) => {
  return (
    <li>
      <Link to={`/${item.id}`}>
        {item.title} <br />
        <p> {item.description}</p>
      </Link>
    </li>
  );
};

export default SubMenuItem;
