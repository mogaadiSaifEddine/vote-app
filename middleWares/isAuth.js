const jwt = require("jsonwebtoken");

const User = require("../models/User");
const secretKey = require("../params");
const isAuth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    console.log(token);
    if (!token)
      return res.status(401).send({ msg: "No Token, authorization denied" });
    const decoded = jwt.decode(token, secretKey);
    console.log(decoded);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).send({ msg: "Autorization denied" });
    }

    req.user = user;
    console.log(user);
    next();
  } catch (err) {
    res.status(400).send({ msg: "Token is not valid" });
  }
};
module.exports = isAuth;
