import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketconnection } from "../utils/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setmessages] = useState([]);
  const [newMessages, setnewMessages] = useState([""]);

  const user = useSelector((store) => store?.user);
  const userId = user?._id;
  const firstName = user?.firstName;

  useEffect(() => {
    if (!userId || !targetUserId) return;

    const socket = createSocketconnection();
    socket.emit("joinChat", { firstName, userId, targetUserId });

    socket.on("messageReceived", ({ firstName, newMessages }) => {
      setmessages((messages) => [...messages, { firstName, newMessages }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const socket = createSocketconnection();

  const sendMessages = () => {
    socket.emit("sendMessage", {
      firstName,
      userId,
      targetUserId,
      newMessages,
    });
    setnewMessages("");
  };

  return (
    <div className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2 mx-auto border border-gray-200 my-5 h-[70vh] flex flex-col shadow rounded">
      <h1 className="p-4 text-lg font-bold border-b border-gray-300 bg-gray-100">
        Chat
      </h1>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            className={
              "chat " +
              (user.firstName === msg.firstName ? "chat-end" : "chat-start")
            }
            key={index}
          >
            <div className="chat-header">
              {msg.firstName}
              <time className="text-xs opacity-50 ml-2">2 hours ago</time>
            </div>
            <div className="chat-bubble">{msg.newMessages}</div>
            <div className="chat-footer opacity-50">Seen</div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 flex flex-wrap items-center gap-2">
        <input
          className="input flex-1 min-w-[150px] border border-gray-300 rounded p-2"
          value={newMessages}
          onChange={(e) => setnewMessages(e.target.value)}
        />
        <button
          className="btn btn-primary whitespace-nowrap"
          onClick={sendMessages}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
