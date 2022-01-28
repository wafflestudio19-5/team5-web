import { useEffect, useState } from "react";
import {
  getMessageDetail,
  getMessageList,
  postMessage,
} from "../../../API/messageAPI";
import {
  ChatDetailType,
  ChatType,
  MessageType,
} from "../../../interface/interface";
import { time } from "../../../function/timeCal";
import MsgModal from "../Home/PostView/MsgModal/MsgModal";
import { useHistory } from "react-router-dom";
import { toastErrorData } from "../../../API/errorHandling";

const Message = () => {
  const [messageList, setMessageList] = useState<ChatType[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatType | undefined>(
    undefined
  );
  const [chatDetail, setChatDetail] = useState<ChatDetailType | undefined>();
  const [isMsgModalOpen, setMsgModalOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [reloading, setReloading] = useState<boolean>(true);
  const sendMessage = () => {
    const form = new FormData();
    form.append("content", message);
    console.log(form);
    console.log(message);
    postMessage("id", selectedChat?.id, form).then(
      (res) => {
        closeModal();
      },
      (error) => {
        if (error.response) {
          toastErrorData(error.response.data);
        }
      }
    );
  };

  const closeModal = () => {
    setMsgModalOpen(false);
    setMessage("");
  };

  const selectChat = (chat: ChatType) => {
    if (chat === selectedChat) {
      setSelectedChat(undefined);
      setChatDetail(undefined);
    } else {
      setSelectedChat(chat);
      getMessageDetail(chat.id).then(
        (res) => {
          setChatDetail(res);
        },
        (error) => {
          if (error.response) {
            toastErrorData(error.response.data);
          }
        }
      );
    }
  };

  useEffect(() => {
    getMessageList().then(
      (res) => {
        console.log(res);
        setMessageList(res);
      },
      (error) => {
        if (error.response) {
          toastErrorData(error.response.data);
        }
      }
    );
  }, []);

  return (
    <div className={"Message__Main"}>
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
      <section className={"Message__List"}>
        <h2>쪽지함</h2>
        {messageList.length === 0 ? (
          <div className={"noMessage"}>쪽지가 없습니다. </div>
        ) : (
          <div>
            {messageList.map((item) => (
              <a
                key={item.id}
                className={selectedChat === item ? "item_active" : "item"}
                onClick={() => selectChat(item)}
              >
                <time>{time(item.updated_at)}</time>
                <h3>{item.partner}</h3>

                <p>{item.recent_chat}</p>
              </a>
            ))}
          </div>
        )}
      </section>
      <section className={"Message__Detail"}>
        <div className={"title"}>
          {selectedChat === undefined ? (
            <a />
          ) : (
            <a className={"sendButton"} onClick={() => setMsgModalOpen(true)} />
          )}

          <h2>{selectedChat?.partner}</h2>
        </div>
        <div>
          {chatDetail?.messages.map((message) => (
            <div key={message.created_at} className={"Message__Detail__Item"}>
              {" "}
              <time>{time(message.created_at)}</time>
              {message.is_mine ? (
                <h3 className={"sent"}>보낸 쪽지</h3>
              ) : message.is_notice ? (
                <h3 className={"notice"}>안내</h3>
              ) : (
                <h3 className={"received"}>받은 쪽지</h3>
              )}
              <p>{message.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Message;
