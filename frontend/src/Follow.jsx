import React, {
  useEffect,
  useState
} from "react";
import axios from "axios";
import {
  Link
} from "react-router-dom";
function Follow() {
  const [users, setUsers] =
    useState([]);
  const currentUser =
    JSON.parse(
      localStorage.getItem("user")
    );
    if (!currentUser) {
  window.location.href = "/login";
}
  useEffect(() => {
    axios.get(
      "http://localhost:5000/users"
    )
    .then((res) => {
      setUsers(res.data);
    });
  }, []);
  const handleFollow =
    async (id) => {
    await axios.put(
      `http://localhost:5000/follow/${id}`,
      {
        userid:
          currentUser._id
      }
    );
    alert("User Followed");
    window.location.reload();
  };
  return (
    <div className="follow-container">
      <h1>
        Users
      </h1>
      <Link to="/">
        Go To Feed
      </Link>
      <br />
      <br />
      {
        users.map((user) => (
          <div className="user-card"
            key={user._id}
          >
            <h3>
              {user.username}
         </h3>
            <p>
              Followers:
              {
                user.followers.length
              }
            </p>
            <p>
              Following:
              {
                user.following.length
              }
            </p>
            <button
            className="follow-btn"
              onClick={() =>
                handleFollow(
                  user._id
                )
              }
            >
              Follow
            </button>
            <hr />
          </div>
        ))
      }
    </div>
  );
}
export default Follow;