import Sidebar from "../components/Sidebar/Sidebar";
import ChatArea from "../components/ChatArea/ChatArea";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../redux/uiSlice";
import "./Home.css";
import { useState } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const [messages, setmessages] = useState([]);

  return (
    <div className="home">
      <Sidebar messages={messages} setMessages={setmessages} />
      <div className="main-content">
        <div className="nav">
          <button
            className="menu-toggle"
            onClick={() => dispatch(toggleSidebar())}
          >
            ☰
          </button>
          <h3>Nexo</h3>
        </div>
        <ChatArea messages={messages} setMessages={setmessages} />
      </div>
    </div>
  );
};

export default Home;
