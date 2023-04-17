'use strict';
const userModel = require('../models/userModel');
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

// TODO: add DB connection and functions to userModel

const getUserList = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();

        res.json(users);
    } catch (e) {
        res.status(500).json({error: 500, message: e.message});
    }
};
//TODO:
const getUser = async (req, res) => {
    //console.log(req.params);
    const userId = (req.params.id);

    const user = await userModel.getUserById(userId);
    
    if (user) {
      res.json(user);
    } else {
      // send 404 response if user not found
      // res.sendStatus(404);
      res.status(404).json({message: 'User not found.'});
    }
};
//posting user
const postUser = async (req, res) => {
    console.log('Creating a new user: ', req.body);
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.passwd, salt);
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: password,
      role: 1, // default user role (normal user)
    };
    const errors = validationResult(req);
    console.log('validation errors', errors);
    if (errors.isEmpty()) {
      try {
        const result = await userModel.insertUser(newUser);
        res.status(201).json({message: 'user created', userId: result});
      } catch (error) {
        res.status(500).json({message: error.message});
      }
    } else {
      res.status(400).json({
        message: 'user creation failed',
        errors: errors.array(),
      });
    }
  };
  
//TODO: update for new user model
const putUser = async (req, res) => {
    console.log('modifying a User', req.body);
    const validationError = validationResult(req);
    if(!validationError.isEmpty()){
        res.status(400).json({status: 400,
        errors: validationError.array(),
        message: 'Invalid Data!' 
        });
        return;
    }
    try {
        const user = req.body;
        const result = await userModel.modifyUser(user);
        res.status(200).json({message: 'User modified!'});
    } catch (e) {
        res.status(404).send('User modified failed!');
        console.error('error', e.message);
        throw new Error('sql user modified failed!')
    }
};
const deleteUser = async (req, res) => {
    // TODO: replace with data model
    console.log('deleteing a User', req.params.id);
    try {
        const result = await userModel.deleteUser(req.params.id);
        res.status(200).send('User deleted!');
    } catch (e) {
        res.status(200).send('user delete failed!');
        console.error('error', e.message);
        throw new Error('sql delete user failed');
    }
};

const checkToken = (req, res) => {
    res.json({user: req.user});
  };

const userController = {
    getUserList,
    getUser,
    postUser,
    putUser,
    deleteUser,
    checkToken
};
module.exports = userController;
