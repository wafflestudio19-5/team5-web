import { useState } from "react";
import NewLectureList from "./NewLectureList";

const NewLecture = ({ resizeContainer }: { resizeContainer: Function }) => {
  const [isOpen, setIsOpen] = useState<"button" | "search" | "create">(
    "button"
  );
  return (
    <>
      {isOpen !== "search" && (
        <div className="NewLecture">
          {isOpen === "button" && (
            <div className="NewLecture__button">
              <button
                className="search"
                onClick={() => {
                  setIsOpen("search");
                  resizeContainer(true);
                }}
              >
                목록에서 검색
              </button>
              <button
                className="create"
                onClick={() => {
                  setIsOpen("create");
                }}
              >
                새 수업 추가
              </button>
            </div>
          )}
          {isOpen === "create" && <div className="NewLecture__create"></div>}
        </div>
      )}
      {isOpen === "search" && (
        <NewLectureList resizeContainer={resizeContainer} />
      )}
    </>
  );
};

export default NewLecture;
