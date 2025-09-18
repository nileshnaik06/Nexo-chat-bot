import { Provider } from "react-redux";
import { store } from "./redux/store";
import MainRoute from "./Routes/MainRoute";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
        theme="dark"
        transition={Bounce}
      />
      <MainRoute />
    </Provider>
  );
}

export default App;
