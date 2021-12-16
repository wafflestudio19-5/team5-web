import { Link } from "react-router-dom";

interface boardDummyItem {
  id: string;
  name: string;
  available: boolean;
}
interface SubMenuItemProps {
  key: string;
  item: boardDummyItem;
}

const SubMenuItem: React.FC<SubMenuItemProps> = ({ item }) => {
  return (
    <li>
      <Link to={`/${item.id}`}>{item.name}</Link>
    </li>
  );
};

export default SubMenuItem;
