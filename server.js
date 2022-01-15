const express = require("express");
const app = express();
const PORT = 5000;
const connectDB = require("./connectDb");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
connectDB();
app.use("/api/user", require("./routes/user"));
app.use("/api/sujet", require("./routes/sujet"));

app.listen(PORT, (error) =>
  error
    ? console.log(error)
    : console.log(`The server is running on port ${PORT}`)
);
