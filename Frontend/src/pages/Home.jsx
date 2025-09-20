import { useDispatch } from "react-redux";
import { Suspense, lazy } from "react";
import Loader from "../components/loader/loader.jsx";

const Sidebar = lazy(() => import("../components/Sidebar/Sidebar"));
const ChatArea = lazy(() => import("../components/ChatArea/ChatArea"));
import { toggleSidebar } from "../redux/uiSlice";
import "./Home.css";
import { useState } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const [messages, setmessages] = useState([]);

  return (
    <div className="home">
      <Suspense fallback={<Loader message="Loading sidebar"/>}>
        <Sidebar messages={messages} setMessages={setmessages} />
      </Suspense>
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
        <Suspense fallback={<Loader message="Loading chat"/>}>
          <ChatArea messages={messages} setMessages={setmessages} />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
