const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;
const SujetSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String },
  description: { type: String, require: true },
  date: { type: Date, default: Date.now() },
  by: { type: String },
});
module.exports = Article = mongoose.model("sujets", SujetSchema);
