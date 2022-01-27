import { useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import LectureList from "./LectureList";
import LectureSearch from "./LectureSearch";
import { toast } from "../../Toast/ToastManager";

const Lecture = () => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div className="Lecture-wrapper">
      <div className="Lecture">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchValue.length > 1) {
              history.push(`/lecture/search/${searchValue}`);
            } else {
              toast.show({
                title: "오류",
                content: "검색어를 두 글자 이상 입력하세요",
                duration: 3000,
              });
            }
          }}
        >
          <input
            type="text"
            className="Lecture__search"
            placeholder="과목명, 교수명으로 검색"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
        </form>
        <Switch>
          <Route
            path="/lecture/search/:searchValue"
            component={LectureSearch}
            exact
          />
          <Route path="/lecture" component={LectureList} />
        </Switch>
      </div>
    </div>
  );
};

export default Lecture;
