import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
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
    if (!userId) return;
      if (!userId || !targetUserId) {
        console.warn("⛔ userId or targetUserId not available yet");
        return;
      }
    const socket = createSocketconnection();
    socket.emit("joinChat", { firstName, userId, targetUserId });
    console.log(firstName, userId, targetUserId);

    socket.on("messageReceived", ({ firstName, newMessages }) => {
      console.log(firstName + " :" + newMessages)
        setmessages((messages) => [...messages, { firstName, newMessages }]);
      
      
    });

    return () => {
      socket.disconnect();
    }
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
    
  }

  return (
    <div className="w-1/2 mx-auto border border-gray-200 m-10 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 m-5 p-5">
        {messages.map((msg, index) => {
          
          return (
          
              <div className="chat chat-start" key={index}>
                <div className="chat-header">
                  {msg.firstName}
                  <time className="text-xs opacity-50">2 hours ago</time>
                </div>
              <div className="chat-bubble">{ msg.newMessages}</div>
                <div className="chat-footer opacity-50">Seen</div>
              </div>
           
          );
         
       })}
      </div>

      <div className="p-5 border border-gray-200 m-2 flex items-center gap-2">
        <input className="input border border-gray-500 text-white-rounded p-2 m-2"
          value={newMessages}
          onChange={(e) => setnewMessages(e.target.value)}
          
        >
        </input>
        <button className="btn btn-primary" onClick={sendMessages}>Send</button>
      </div>
    
      

    </div>
  )
}

export default Chat