import React, {
  useEffect,
  useState
} from "react";
import axios from "axios";
import {
  Link,
  useNavigate
} from "react-router-dom";
function Feed() {
  const navigate =
    useNavigate();
  const [posts, setPosts] =
    useState([]);
  const user =
    JSON.parse(
      localStorage.getItem("user")
    );
    if (!user) {
  window.location.href = "/login";
}
  useEffect(() => {
    axios.get(
      "https://instaproject-backend.onrender.com/posts"
    )
    .then((res) => {
      setPosts(res.data);
    });
  }, []);
  const handleLike =
    async (id) => {
    await axios.put(
      `https://instaproject-backend.onrender.com/like/${id}`,
      {
        userid: user._id
      }
    );
    window.location.reload();
  };
  const handleComment =
    async (id) => {
    const text =
      prompt("Enter Comment");
    await axios.post(
      `https://instaproject-backend.onrender.com/comment/${id}`,
      {
        userid: user._id,
        text
      }
    );
    window.location.reload();
  };
  const handleLogout =
    () => {
    localStorage.removeItem(
      "token"
    );
    localStorage.removeItem(
      "user"
    );
    navigate("/login");
  };
  return (
    <div className="feed-container">
      <h1 className="feed-title">
        Instagram Feed
      </h1>
      <Link to="/create">
        Create Post
      </Link>
      <br />
      <br />
      <Link to="/follow">
        Users
      </Link>
      <br />
      <br />
      <button
      className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>
      {
        posts.map((post) => (
          <div  className="post-card"
            key={post._id}
            style={{
              border:
                "1px solid black",
              padding: "20px",
              margin: "20px"
            }}
          >
            <img
             className="post-image"
              src={post.image}
              width="300"
            />
            <h3>
              {post.caption}
            </h3>
            <p>
              Likes:
              {post.likes.length}
            </p>
            <button
             className="like-btn"
              onClick={() =>
                handleLike(
                  post._id
                )
              }
            >
              Like
            </button>
            <button
            className="comment-btn"
              onClick={() =>
                handleComment(
                  post._id
                )
              }
            >
              Comment
            </button>
            <h4>
              Comments
            </h4>
            {
              post.comments.map(
                (
                  comment,
                  index
                ) => (
                  <p className="comment" key={index}>
                    {comment.text}
                  </p>
                )
              )
            }
          </div>
        ))
      }
    </div>
  );
}
export default Feed;
