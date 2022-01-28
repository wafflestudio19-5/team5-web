import { useEffect, useState } from "react";
import { getMessageDetail, getMessageList } from "../../../API/messageAPI";
import { ChatDetailType, ChatType } from "../../../interface/interface";
import { time } from "../../../function/timeCal";

const Message = () => {
  const [messageList, setMessageList] = useState<ChatType[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatType | undefined>(
    undefined
  );
  const [chatDetail, setChatDetail] = useState<ChatDetailType | undefined>();

  const selectChat = (chat: ChatType) => {
    if (chat === selectedChat) {
      setSelectedChat(undefined);
      setChatDetail(undefined);
    } else {
      setSelectedChat(chat);
      getMessageDetail(chat.id).then((res) => {
        setChatDetail(res);
      });
    }
  };

  useEffect(() => {
    getMessageList().then((res) => {
      console.log(res);
      setMessageList(res);
    });
  }, []);

  return (
    <div className={"Message__Main"}>
      <section className={"Message__List"}>
        <h2>쪽지함</h2>
        {messageList.length === 0 ? (
          <div>쪽지가 없습니다. </div>
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
          <h2>{selectedChat?.partner}</h2>
        </div>
        <div>
          {chatDetail?.messages.map((message) => (
            <div key={message.created_at} className={"Message__Detail__Item"}>
              {" "}
              <time>{time(message.created_at)}</time>
              {message.is_mine ? (
                <h3 className={"sent"}>보낸 쪽지</h3>
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
