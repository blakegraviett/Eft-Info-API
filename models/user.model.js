// * IMPORTS
const { model, Schema } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

// * MODEL
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    lowercase: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

// * METHODS
// Salt & Hash Password Before Save New User
UserSchema.pre('save', async function () {
  // Salt the password
  salt = await bcrypt.genSalt(9)

  // Hash the password
  this.password = await bcrypt.hash(this.password, salt)
})
// Create JWT Method
UserSchema.methods.genJWT = function() {

  token = jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: '30d'})

  return token;
}

// Compare Passwords
UserSchema.methods.comparePasswords = async function(incomingPass) {
  isMatch = await bcrypt.compare(incomingPass, this.password)

  return isMatch;
}

// * EXPORTS
module.exports = model('User', UserSchema);
