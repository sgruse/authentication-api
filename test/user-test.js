'use strict';

let chai = require('chai');
let chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
let expect = require('chai').expect;
let request = require('chai').request;
let mongoose = require('mongoose');
require(__dirname + '/../server');
require(__dirname + '/../routers/createUser')
let User = require(__dirname + '/../model/user');

describe('Testing for a newly created user and if an app Token is created', () => {

  let userId;
  beforeEach((done) => {
    let newUser = new User({name: 'Luc', password: 'green'});
    newUser.save((err, data) => {
      userId = data._id;
      done();
    })
  })
// TESTING POST FOR A NEWLY CREATED USER
  it('Should detect the user created in the "send" of the post test', (done) => {
    request('localhost:4000')
    .post('/api/createUser')
    .send('{"name":"Gangster Gibbs", "password":"gibbs"}')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res.status).to.eql(200);
      expect(res.body.name).to.eql('Gangster Gibbs');
      // expect(res.body.password.type)
      done();
    })
  })
// TESTING FOR TOKEN CREATION BASED ON USER
  it('Should see the Token created when hitting the login route with user created in before block', (done) => {
    request('localhost:4000')
    .post('/public/login')
    .auth('Luc', 'green')
    .end((err, res) => {
      expect(err).to.eql(null)
      expect(res.status).to.eql(200)
      expect(res.body).to.have.property('token')
      done();
    })
  })
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    })
  })
})
