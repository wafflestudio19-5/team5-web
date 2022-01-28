import { useEffect, useState } from "react";
import { getMessageList } from "../../../API/messageAPI";

const Message = () => {
  const [messageList, setMessageList] = useState([]);
  const [selectedChat, setSelectedChat] = useState("");

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
          <div>쪽지가 있습니다.</div>
        )}
      </section>
      <section className={"Message__Detail"}>
        <div className={"title"}>
          <h2>계정</h2>
        </div>
      </section>
    </div>
  );
};

export default Message;
