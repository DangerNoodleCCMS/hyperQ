const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController')

/************************************************/
/////////////////  route: /create ////////////////
/************************************************/


//  Handle create user request
router.post('/signup',
    userController.signup,
    cookieController.setUserIDCookie,
    (req, res) => res.status(200).json(res.locals.priorityLists));


//  Handle sign in request
router.post('/login',
    userController.login,
    cookieController.setUserIDCookie,
    (req, res) => res.status(200).json(res.locals.priorityLists));


module.exports = router;