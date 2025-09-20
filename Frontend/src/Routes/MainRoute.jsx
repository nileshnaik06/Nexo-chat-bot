import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "../components/loader/loader.jsx";

const Home = lazy(() => import("../pages/Home.jsx"));
const Login = lazy(() => import("../pages/Login.jsx"));
const Register = lazy(() => import("../pages/Register.jsx"));

const MainRoute = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader message="Loading page"/>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default MainRoute;
