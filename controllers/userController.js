'use strict';
const userModel = require('../models/userModel');

// TODO: add DB connection and functions to userModel

const getUserList = async (req, res) => {
    try {
        const users = await userModel.getAllUsers();

        res.json(users);
    } catch (e) {
        res
            .status(500)
            .json({error: 500, message: e.message});
    }
};
//TODO:
const getUser = async (req, res) => {
    //console.log(req.params);
    const userId = (req.params.id);

    try {
        const [user] = await userModel.getUserById(userId);
        console.log('getUser', user);
        res.json(user);
    } catch (e) {
        res
            .status(404)
            .json({message: 'User Not Found.'})
        console.error('error', e.message);
        throw new Error('sql User Not Found.')
    }
};

const postUser = async (req, res) => {
    console.log('posting a user: ', req.body);
    const newUser = req.body;
    try {
     //   const result = await userModel.insertUser(newUser);
        res
            .status(201)
            .json('new User Added!');
    } catch (error) {
        res
            .status(404)
            .send('adding a User failed');
        console.error('error', error.message);
        throw new Error('sql posting a User failed');
    }
};
//TODO: update for new user model
const putUser = async (req, res) => {
    console.log('modifying a User', req.body);
    try {
        const user = req.body;
        const result = await userModel.modifyUser(user);
        res
            .status(200)
            .send('cat modified!');
    } catch (e) {
        res
            .status(404)
            .send('User modified failed!');
        console.error('error', e.message);
        throw new Error('sql user modified failed!')
    }
};

const deleteUser = async (req, res) => {
    console.log('deleteing a User', req.params.id);
    try {
        const result = await userModel.deleteUser(req.params.id);
        res
            .status(200)
            .send('User deleted!');
    } catch (e) {
        res
            .status(200)
            .send('user delete failed!');
        console.error('error', e.message);
        throw new Error('sql delete user failed');
    }
};

const userController = {
    getUserList,
    getUser,
    postUser,
    putUser,
    deleteUser
};
module.exports = userController;
