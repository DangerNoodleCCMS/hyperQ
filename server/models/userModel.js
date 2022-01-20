const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


//  Create the salt rounds
const SALT_ROUNDS = 11;

//  Create user Schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});


//  Add the pre middleware to encrypt password before saving
userSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, SALT_ROUNDS);
  this.password = hash;
  return next();
})


//  Create a method so we can check password
userSchema.methods.validatePassword = async function (unhashed) {
  const isMatching = await bcrypt.compare(unhashed, this.password);
  return isMatching;
};


module.exports = mongoose.model('User', userSchema);
