const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  following: [],
  followers: []
});
const User = mongoose.model(
  "User",
  userSchema
);
const postSchema = new mongoose.Schema({
  userid: String,
  image: String,
  caption: String,
  likes: [],
  comments: [],
  createdAt: {
    type: Date,
    default: Date.now
  }
});
const Post = mongoose.model(
  "Post",
  postSchema
);
app.post("/register", async (req, res) => {
  try {
    const {
      username,
      email,
      password
    } = req.body;
    const existingUser =
      await User.findOne({ email });
    if (existingUser) {
      return res.json({
        message: "User already exists"
      });
    }
    const hash =
      await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hash
    });
    await newUser.save();
    res.json({
      message: "Registered Successfully"
    });
  }
  catch (err) {
    console.log(err);
  }
});
app.post("/login", async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    const user =
      await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "User Not Found"
      });
    }
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );
    if (!isMatch) {
      return res.json({
        message: "Wrong Password"
      });
    }
    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET
    );
    res.json({
      message: "Login Success",
      token,
      user
    });
  }
  catch (err) {
    console.log(err);
  }
});
app.post("/createpost", async (req, res) => {
  try {
    const {
      userid,
      image,
      caption
    } = req.body;
    const newPost = new Post({
      userid,
      image,
      caption
    });
    await newPost.save();
    res.json({
      message: "Post Created"
    });
  }
  catch (err) {
    console.log(err);
  }
});
app.get("/posts", async (req, res) => {
  try {
    const posts =
      await Post.find().sort({
        createdAt: -1
      });
    res.json(posts);
  }
  catch (err) {
    console.log(err);
  }
});
app.put("/like/:id", async (req, res) => {
  try {
    const {
      userid
    } = req.body;
    const post =
      await Post.findById(
        req.params.id
      );
    if (
      post.likes.includes(userid)
    ) {
      post.likes =
        post.likes.filter(
          (id) => id != userid
        );
    }
    else {
      post.likes.push(userid);
    }
    await post.save();
    res.json(post);
  }
  catch (err) {
    console.log(err);
  }
});
app.post("/comment/:id", async (req, res) => {
  try {
    const {
      userid,
      text
    } = req.body;
    const post =
      await Post.findById(
        req.params.id
      );
    post.comments.push({
      userid,
      text
    });
    await post.save();
    res.json(post);
  }
  catch (err) {
    console.log(err);
  }
});
app.put("/follow/:id", async (req, res) => {
  try {
    const currentUser =
      await User.findById(
        req.body.userid
      );
    const targetUser =
      await User.findById(
        req.params.id
      );
    if (
      !currentUser.following.includes(
        req.params.id
      )
    ) {
      currentUser.following.push(
        req.params.id
      );
      targetUser.followers.push(
        req.body.userid
      );
      await currentUser.save();
      await targetUser.save();
    }
    res.json({
      message: "User Followed"
    });
  }
  catch (err) {
    console.log(err);
  }
});
app.get("/users", async (req, res) => {
  const users =
    await User.find();
  res.json(users);
});
app.listen(process.env.PORT, () => {
  console.log(
    "Server Running On Port 5000"
  );
});
