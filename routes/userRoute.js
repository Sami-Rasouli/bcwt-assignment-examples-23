'use strict';
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUserList);
router.get('/:userId', userController.getUser);

router.post('/', userController.postUser);

// TODO: add  other endpoints needed
router.put('/', userController.putUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;