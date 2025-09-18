import "./Sidebar.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../redux/uiSlice";
import { setCurrentChat } from "../../redux/chatSlice";
import {
  createChat,
  fetchChats,
  fetchMessages,
} from "../../redux/actions/chatActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Sidebar = ({ setMessages }) => {
  const dispatch = useDispatch();
  const { isSidebarOpen } = useSelector((state) => state.ui);
  const { chats, currentChat } = useSelector((state) => state.chat);
  const navigate = useNavigate();
  // const { messages } = useSelector((state) => state.chat);
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  // fetch current user to determine auth status
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://nexo-chat-bot.onrender.com/api/auth/fetchUser", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          // not authenticated or server error
          setUser(null);
          return;
        }

        const data = await res.json();
        if (data?.user) setUser(data.user);
        else setUser(null);
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleNewChat = async () => {
    const chatTitle = prompt("Enter chat title");
    if (!chatTitle) return;

    try {
      const result = await dispatch(createChat(chatTitle)).unwrap();
      if (result.chat) {
        const formattedChat = {
          id: result.chat._id,
          title: result.chat.title,
          lastActivity: result.chat.lastActivity,
          user: result.chat.user,
        };
        dispatch(setCurrentChat(formattedChat));
      }
    } catch (error) {
      if (error.message === "Unauthorized") {
        toast.error("Please login and try again");
        navigate("/login");
      } else {
        toast.error(error);
      }
    }
  };

  const getMessages = async (chatID) => {
    const response = await dispatch(fetchMessages(chatID));
    // console.log(response.payload);
    // console.log(messages);

    setMessages(
      response.payload.map((m) => ({
        sender: m.role,
        content: m.content,
        id: m._id,
      }))
    );
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h1>Nexo</h1>
        <button className="close-btn" onClick={() => dispatch(toggleSidebar())}>
          ×
        </button>
      </div>

      <button className="new-chat-btn" onClick={handleNewChat}>
        + New Chat
      </button>

      <div className="chat-history">
        {chats?.map((chat) => (
          <div
            key={chat?.id}
            className={`chat-item ${
              currentChat?.id === chat.id ? "active" : ""
            }`}
            onClick={() => {
              dispatch(setCurrentChat(chat));
              getMessages(chat.id);
              if (window.innerWidth < 768) dispatch(toggleSidebar());
            }}
          >
            <span className="chat-title">{chat.title}</span>
          </div>
        ))}
      </div>

      <div className="userLogin">
        {user ? (
          <>
            <div className="avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div className="user-info">
              <div className="user-name">{user.name || user.email}</div>
              <div className="user-email">{user.email}</div>
            </div>
            <div className="user-actions">
              <button
                onClick={async () => {
                  try {
                    const res = await fetch(
                      "https://nexo-chat-bot.onrender.com/api/auth/logout",
                      {
                        method: "POST",
                        credentials: "include",
                      }
                    );
                    if (res.ok) {
                      setUser(null);
                      navigate("/login");
                    } else {
                      toast.error("Logout failed");
                    }
                  } catch (err) {
                    console.log(err);
                    toast.error("Logout failed");
                  }
                }}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="user-actions">
              <button
                className="primary"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
 
