import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from "./Logininsta.jsx";
import Register from "./Registerinsta.jsx";
import Feed from "./Feed.jsx";
import Createpost from "./Createpost.jsx";
import Follow from "./Follow.jsx";
function Sathvi() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"

          element={
            user
            ?
            <Navigate to="/feed" />
            :
            <Navigate to="/register" />
          }
        />
        <Route
          path="/register"
          element={
            user
            ?
            <Navigate to="/feed" />
            :
            <Register />
          }
        />
        <Route
          path="/login"
          element={
            user
            ?
            <Navigate to="/feed" />
            :
            <Login />
          }

        />
        <Route
          path="/feed"
          element={
            user
            ?
            <Feed />
            :
            <Navigate to="/login" />
          }

        />
        <Route
          path="/create"
          element={
            user
            ?
            <Createpost />
            :
            <Navigate to="/login" />
          }
        />
        <Route
          path="/follow"
          element={
            user
            ?
            <Follow />
            :
            <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default Sathvi;