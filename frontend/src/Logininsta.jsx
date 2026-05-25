import React, {
  useState
} from "react";
import axios from "axios";
import {
  useNavigate,
  Link
} from "react-router-dom";
function Login() {
  const navigate =
    useNavigate();
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");
  const handleLogin =
    async (e) => {
    e.preventDefault();
    const res =
      await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password
        }
      );
    alert(res.data.message);
    if (
      res.data.message ===
      "Login Success"
    ) {
      localStorage.setItem(
        "token",
        res.data.token
      );
      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );
    navigate("/feed");
    }
  };
  return (
    <div>
      <h1 className="auth-title">Login</h1>
      <form className="auth-box" onSubmit={handleLogin}>
        <input
        className="auth-input"
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />
        <br />
        <input
        className="auth-input"
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />
        <br />
        <button  className="auth-button">
          Login
        </button>
      </form>
      <br />
      <Link className="auth-link" to="/register">
        Create New Account
      </Link>
    </div>
  );
}
export default Login;