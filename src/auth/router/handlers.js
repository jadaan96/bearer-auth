'use strict';

const { users,todo } = require('../models/index.js');

async function handleSignup(req, res, next) {
  try {
    let userRecord = await users.create(req.body);
    console.log(req.body);
    const output = {
      user: userRecord.username,
      token: userRecord.token,
    };
    res.status(201).json(userRecord);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleSignin(req, res, next) {
  try {
    
    res.status(200).json(req.user);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await users.findAll({});
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
  } catch (e) {
    console.error(e);
    next(e);
  }
}
async function handleGetlist(req, res, next) {
  try {
    const userRecords = await todo.findAll({});
    console.log(userRecords);
    res.status(200).json(userRecords);
  } catch (e) {
    console.error(e);
    next(e);
  }
}
async function handlePostlist(req, res, next) {
  try {
    const obj = req.body;
    const data = await todo.create(obj);
    res.status(201).json({data});
  } catch (e) {
    console.error(e);
    next(e);
  }
}
async function handleUpdatelist(req, res, next) {
  try {
    const id = req.body.id;
    const obj = req.body.complete;
    let updatedRecord = await todo.update(obj,{ where: { id }} )
    const userRecords = await todo.findAll({});

    res.status(200).json(userRecords);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).send('Welcome to the secret area!');
}

module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleSecret,
  handleGetlist,
  handlePostlist,
  handleUpdatelist,
};