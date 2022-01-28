import { useState } from "react";

const MsgModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div
      className="TimeTable__modal-wrapper"
      onClick={() => {
        setModalOpen(false);
      }}
    >
      {/*<div className="TimeTable__modal-export"></div>*/}
      <form
        className="TimeTable__modal settings"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal-buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            삭제
          </button>
          <input type="submit" value="설정 저장" />
        </div>
        <div
          className="close"
          onClick={() => {
            setModalOpen(false);
          }}
        />
      </form>
    </div>
  );
};

export default MsgModal;
