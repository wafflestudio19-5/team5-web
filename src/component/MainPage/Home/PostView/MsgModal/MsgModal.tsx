import { useState } from "react";
import { postMessage } from "../../../../../API/messageAPI";
import { MessageType } from "../../../../../interface/interface";

const MsgModal = () => {
  const [isMsgModalOpen, setMsgModalOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [msgType, setMsgType] = useState<MessageType>({
    started_from: "",
    id: 0,
  });

  const sendMessage = () => {
    const form = new FormData();
    form.append("content", message);
    postMessage(msgType.started_from, msgType.id, form).then((res) => {
      closeModal();
    });
  };

  const closeModal = () => {
    setMsgModalOpen(false);
    setMessage("");
  };

  return (
    <div>
      {isMsgModalOpen ? (
        <div className={"Modal_Wrapper"} onClick={() => closeModal()}>
          <div
            className={"Modal"}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h3>쪽지 보내기</h3>
            <p>
              <textarea
                name="message"
                className={"text"}
                placeholder={"내용을 입력해주세요"}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
            </p>
            <button className={"sendButton"} onClick={sendMessage}>
              전송
            </button>
            <div
              className="close"
              onClick={() => {
                closeModal();
              }}
            />
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default MsgModal;
