'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let mongoose = require('mongoose');
let apiRouter = express.Router();
let publicRouter = express.Router();

mongoose.connect('mongodb://localhost/db');

app.use(bodyParser.json());

require('./routers/login')(publicRouter);
require('./routers/createUser')(apiRouter);

app.use('/public', publicRouter)
app.use('/api', apiRouter)

app.listen(4000, () => {
  console.log('Server started on port 4000');
});
