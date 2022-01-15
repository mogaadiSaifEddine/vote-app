const router = require("express").Router();

const User = require("../models/User");

const bcrypt = require("bcrypt");
const secretKey = require("../params").secretKey;

const jwt = require("jsonwebtoken");

const registerRules = require("../middlewares/validator");

const isAuth = require("../middlewares/isAuth");

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  try {
    // Check for existing user
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    // Create new User
    user = new User({ email, password });
    // Create Salt & hash
    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    // Save the user
    await user.save();

    // sing user
    const payload = {
      _id: user._id,
    };

    const token = await jwt.sign(payload, secretKey, {
      expiresIn: "7 days",
    });

    res.status(200).send({ msg: "User registred with success", user, token });
  } catch (err) {
    res.status(500).send({ msg: "Server Error" });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check for existing user
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Bad Credentials! email" });
    }
    //Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Bad Credentials! password" });
    }
    // sing user
    const payload = {
      _id: user._id,
    };

    const token = await jwt.sign(payload, secretKey, {
      expiresIn: "7 days",
    });

    res.send({ msg: "Logged in with success", user, token });
  } catch (err) {
    res.status(500).send({ msg: "Server Error" });
  }
});

// Get authentified user
router.get("/user", isAuth, (req, res) => {
  res.send({ user: req.user });
});

module.exports = router;
