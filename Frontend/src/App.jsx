import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Bounce, ToastContainer } from "react-toastify";
import { Suspense, lazy } from "react";
import Loader from "./components/loader/loader.jsx";

const MainRoute = lazy(() => import("./Routes/MainRoute"));

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
      <Suspense fallback={<Loader message="Loading app"/>}>
        <MainRoute />
      </Suspense>
    </Provider>
  );
}

export default App;
