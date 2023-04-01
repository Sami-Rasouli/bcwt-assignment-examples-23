'use strict';
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/userController');

router
    .route('/')
    .get(userController.getUserList)
    .post(
        body('name').not().isEmpty().withMessage('Name is required').isLength({min: 3, max: 30}).withMessage('Name must be between 3 and 30 characters').matches(/^[a-zöäåA-ZÖÄÅ0-9\s]*$/).withMessage('Name can only contain letters with numbers and spaces').escape(),
        body('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format').normalizeEmail(),
        body('passwd').not().isEmpty().withMessage('Password is required').isLength({min: 8}).withMessage('Password must be at least 8 characters long').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>\/?]).+$/).withMessage(
            'Password must include at least one lowercase letter, one uppercase letter, one' +
            ' number, and one special character'
        ),
        userController.postUser
    )
    .put(
        body('name').not().isEmpty().withMessage('Name is required').isLength({min: 3, max: 30}).withMessage('Name must be between 3 and 30 characters').matches(/^[a-zöäåA-ZÖÄÅ0-9\s]*$/).withMessage('Name can only contain letters with numbers and spaces').escape(),
        body('email').not().isEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format').normalizeEmail(),
        body('passwd').not().isEmpty().withMessage('Password is required').isLength({min: 8}).withMessage('Password must be at least 8 characters long').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>\/?]).+$/).withMessage(
            'Password must include at least one lowercase letter, one uppercase letter, one' +
            ' number, and one special character'
        ),
        userController.putUser)

router
    .route('/:id')
    .get(userController.getUser)
    .delete(userController.deleteUser)

//TODO: add other
//TODO:
module.exports = router;