const User = require("../models/Users");
const bcryptjs = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const express = require("express");

const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const hashedPassword = await bcryptjs.hash(password, 10);

    let newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, "passwordKey");
    res.json({ token, ...newUser._doc, userId: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

//Log In
authRouter.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with this email does not exist!" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, "passwordKey");
    res.json({ token, ...user._doc, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

authRouter.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, "passwordKey");
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    res.json(true);
  } catch (error) {
    console.error("Error during user registration:", error); // Log detailed error
    res
      .status(500)
      .json({ msg: "Internal server error", error: error.message });
  }
});

//get user data
authRouter.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({ ...user.doc, token: req.token });
});

module.exports = authRouter;
