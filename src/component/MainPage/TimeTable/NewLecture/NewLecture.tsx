import { useState } from "react";
import NewLectureList from "./NewLectureList";

const NewLecture = ({
  currentSemester,
  resizeContainer,
  addLectureToTable,
}: {
  currentSemester: string;
  resizeContainer: Function;
  addLectureToTable: Function;
}) => {
  const [isOpen, setIsOpen] = useState<"button" | "search" | "create">(
    "button"
  );

  const addLecture = () => {};

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
        <NewLectureList
          currentSemester={currentSemester}
          resizeContainer={resizeContainer}
          addLectureToTable={addLectureToTable}
        />
      )}
    </>
  );
};

export default NewLecture;
