const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  content: { type: String, required: true },
  username: { type: String, required: true }, 
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  messageId: { type: String }
});

module.exports = mongoose.model("Message", schema);