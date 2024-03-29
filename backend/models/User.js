const mongoose = require("mongoose");
let AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    default: ""
  },
  role: {
    type: String,
    default: ""
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  },
  name: {
    type: String,
    default: ""
  },
  lname: {
    type: String,
    default: ""
  }
});
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
UserSchema.plugin(AutoIncrement, {id:'user_id',inc_field: 'user_id'});
module.exports = mongoose.model("User", UserSchema);
