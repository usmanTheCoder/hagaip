import { Route, Routes } from "react-router";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CreateForm from "./pages/CreateForm";
import Design from "./pages/Design";
import Personal from "./pages/Personal";
import Lekium from "./pages/Lekium";
import Activated from "./pages/Activated";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allUsers, refreshToken } from "../toolkit/slices/authSlice";
import CryptoJs from "crypto-js";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { getFormData } from "../toolkit/slices/formSlice";
import { userInfo } from "../toolkit/slices/profileSlice";
import CreateUser from "./pages/CreateUser";
import NotFound from "./pages/NotFound";

function App() {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.auth);
  const login = localStorage.getItem("firstLogin");
  useEffect(() => {
    if (localStorage.getItem("refreshtoken")) {
      const bytes = CryptoJs.AES.decrypt(
        localStorage.getItem("refreshtoken"),
        import.meta.env.VITE_REACT_APP_SECRET
      );
      const data = JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
      dispatch(refreshToken(data));
      dispatch(getFormData());
      dispatch(userInfo());
    }
  }, [loggedIn, dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/user/activation/:activation_token"
          element={<Activated />}
        />
        <Route path="/user/reset/:ac_token" element={<ResetPassword />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/dashboard" element={login ? <Layout /> : <NotFound />}>
          <Route index element={login ? <Dashboard /> : <NotFound />} />
          <Route path="profile" element={login ? <Profile /> : <NotFound />} />
          <Route
            path="create_user"
            element={login ? <CreateUser /> : <NotFound />}
          />
          <Route path="form" element={login ? <CreateForm /> : <NotFound />} />
          <Route path="design" element={login ? <Design /> : <NotFound />} />
          <Route
            path="personal"
            element={login ? <Personal /> : <NotFound />}
          />
          <Route path="lekium" element={login ? <Lekium /> : <NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
