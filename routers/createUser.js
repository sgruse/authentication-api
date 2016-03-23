'use strict';

let User = require(__dirname + '/../model/user');

module.exports = (apiRouter) => {
  apiRouter.route('/createUser')
  .post((req, res) => {
    req.on('data', (data) => {
      req.body = JSON.parse(data)
      let newUser = new User(req.body);
      newUser.save((err, user) => {
        res.status(200);
        res.json(user);
        res.end();
      })
    })
  })
}
