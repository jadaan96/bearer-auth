'use strict';

const express = require('express');
const authRouter = express.Router();

const basicAuth = require('../middleware/basic.js');
const bearerAuth = require('../middleware/bearer.js');
const {
  handleSignin,
  handleSignup,
  handleGetUsers,
  handleSecret,
  handleGetlist,
  handlePostlist,
  handleUpdatelist,
} = require('./handlers.js');

authRouter.post('/signup', handleSignup);
authRouter.post('/signin', basicAuth, handleSignin);
authRouter.get('/todo', handleGetlist);
authRouter.post('/todo', handlePostlist);
authRouter.put('/todo', handleUpdatelist);

authRouter.get('/secret', bearerAuth, handleSecret);

module.exports = authRouter;