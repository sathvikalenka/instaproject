import React, {
  useState
} from "react";
import axios from "axios";
import {
  useNavigate,
  Link
} from "react-router-dom";
function Register() {
  const navigate =
    useNavigate();
  const [username, setUsername] =
    useState("");
  const [email, setEmail] =
    useState("");
  const [password, setPassword] =
    useState("");
  const handleRegister =
    async (e) => {
    e.preventDefault();
    const res =
      await axios.post(
        "http://localhost:5000/register",
        {
          username,
          email,
          password
        }
      );
    alert(res.data.message);
    if (
      res.data.message ===
      "Registered Successfully"
    ) {
      navigate("/login");
    }
  };
  return (
    <div>
      <h1 className="auth-title">Register</h1>
      <form className="auth-box" onSubmit={handleRegister}>
        <input className="auth-input"
          type="text"
          placeholder="Username"
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
        />
        <br />
        <input className="auth-input"
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
        <button className="auth-button">
          Register
        </button>
      </form>
      <br />
      <Link className="auth-link" to="/login">
        Already have account?
        Login
      </Link>
    </div>
  );
}
export default Register;