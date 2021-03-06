'use strict';

let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let mongoose = require('mongoose')

let usersSchema = mongoose.Schema({
  name: String,
  password: String,
  group: String
})

usersSchema.pre('save', function(next) {

  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
  next()
})

usersSchema.methods.compareHash = function(password) {
  return bcrypt.compareSync(password, this.password)
}

usersSchema.methods.generateToken = function() {
  return jwt.sign({_id: this._id, group: this.group}, 'CHANGE ME')
}

let Users = mongoose.model('Users', usersSchema)
module.exports = Users;
