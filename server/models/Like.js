const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const likeSchema = new Schema({
  painting: { type: Schema.ObjectId, ref: "Painting" },
  user: { type: Schema.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Like", likeSchema);
