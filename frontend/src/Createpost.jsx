import React, {
  useState
} from "react";
import axios from "axios";
import {
  useNavigate,
  Link
} from "react-router-dom";
function Createpost() {
  const navigate =
    useNavigate();
  const [image, setImage] =
    useState("");
  const [caption, setCaption] =
    useState("");
  const user =
    JSON.parse(
      localStorage.getItem("user")
    );
    if (!user) {
  window.location.href = "/login";
}
  const handlePost =
    async () => {
    await axios.post(
      "http://localhost:5000/createpost",
      {
        userid: user._id,
        image,
        caption
      }
    );
    alert("Post Created");
navigate("/feed");
  };
  return (
    <div className="create-container">
      <h1 className="create-title">Create Post</h1>
      <Link to="/">
        Go To Feed
      </Link>
      <br />
      <br />
      <input
      className="create-input"
        type="text"
        placeholder="Image URL"
        onChange={(e) =>
          setImage(
            e.target.value
          )
        }
      />
      <br />
      <input
      className="create-input"
        type="text"
        placeholder="Caption"
        onChange={(e) =>
          setCaption(
            e.target.value
          )
        }
      />
      <br />
      <button
      className="create-btn"
        onClick={handlePost}
      >
        Upload Post
      </button>
    </div>
  );
}
export default Createpost;