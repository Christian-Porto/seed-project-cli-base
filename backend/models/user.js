const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  gender: {type: String, required: true},
  personType: {type: String, required: true},
  terms: {type: Boolean, required: true},
  messages: [{type: Schema.Types.ObjectId, ref: "Message"}]
});

schema.pre("save", async function(next) {
  if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
});

schema.methods.verificaPassword = async function(passwordEntrada, userPassword) {
  return await bcrypt.compare(passwordEntrada, userPassword);
};

module.exports = mongoose.model("User", schema);