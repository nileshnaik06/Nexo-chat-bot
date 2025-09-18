import { useState, useEffect, useRef } from "react";
import "./ChatArea.css";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
// import { addMessage } from "../../redux/actions/chatActions";
import WelcomeScreen from "../WelcomeScreen/WelcomeScreen";

const ChatArea = ({ messages, setMessages }) => {
  const dispatch = useDispatch();
  const [inputMessage, setInputMessage] = useState("");
  const { status, error } = useSelector((state) => state.chat);
  const { currentChat } = useSelector((state) => state.chat);
  const [socket, setSocket] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket) {
      const tempSocket = io("https://nexo-chat-bot.onrender.com", { withCredentials: true });

      tempSocket.on("connect", () => {
        tempSocket.on("model-resp", (messagePayload) => {
          setIsTyping(false);
          // const normalizedMessage = Array.isArray(messagePayload)
          //   ? messagePayload.map((msg) => ({ ...msg, sender: msg.role }))
          //   : { ...messagePayload };

          // dispatch(addMessage(normalizedMessage));
          setMessages((prev) => ({ ...prev, messagePayload }));
        });
      });

      setSocket(tempSocket);
    }

    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    const userMessage = {
      id: currentChat?.id,
      content: inputMessage,
      sender: "user",
    };

    socket.emit("user-prompt", {
      chat: currentChat?.id,
      content: inputMessage,
    });
    setIsTyping(true);
    setMessages((prev) => ({ ...prev, userMessage }));
    // dispatch(addMessage(userMessage));
    setInputMessage("");
  };

  return (
    <div className="chat-area">
      {!currentChat?.id ? (
        <WelcomeScreen />
      ) : (
        <>
          <div className="messages-container">
            {error && <div className="error-message">Error: {error}</div>}
            {messages.length > 0 &&
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${
                    message?.sender === "user" ? "user" : "model"
                  }`}
                >
                  <div className="message-content">{message?.content}</div>
                </div>
              ))}
            {(status === "loading" || isTyping) && (
              <div className="message received">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form
            className="message-input-container"
            onSubmit={handleSendMessage}
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={status === "loading"}
            />
            <button type="submit" disabled={status === "loading"}>
              Send
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatArea;
