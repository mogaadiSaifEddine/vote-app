const mongoose = require("mongoose");
const MONGO_URI = require("./params").MONGO_URI;
const connectDB = async () => {
  try {
    console.log(MONGO_URI);
    await mongoose.connect(
      "mongodb+srv://saif:dellpc910@cluster0.8jduj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected...");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDB;
