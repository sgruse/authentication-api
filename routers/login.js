'use strict'

let jwt = require('jsonwebtoken')
let User = require(__dirname + '/../model/user.js')

module.exports = (router) => {
  router.post('/login', (req, res) => {
    let authorizationArray = req.headers.authorization.split(' ')
    let method = authorizationArray[0]
    let base64ed = authorizationArray[1]
    let authArray = new Buffer(base64ed, 'base64').toString().split(':');
    let name = authArray[0]
    let password = authArray[1]

    User.find({name: name}, (err, user) => {
      let valid = user[0].compareHash(password)
      if(!valid){
        return res.json({status: 'failure'})
      }
      console.log('YOUR TOKEN IS : ', user[0].generateToken())
      res.json({token: user[0].generateToken()})
      res.status(200)
      res.end()
    })
  })
}
