const express = require('express');

const router = express.Router();

//  Import controllers
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController');
const dbController = require('../controllers/dbController');

/************************************************/
/////////////////  route: /signup ////////////////
/************************************************/

//  Handle create user request
router.post('/signup',
    userController.signup,
    cookieController.setUserIDCookie,
    (req, res) => res.status(200).json(res.locals.priorityLists));


/************************************************/
/////////////////  route: /login /////////////////
/************************************************/    

//  Handle sign in request
router.post('/login',
    userController.login,
    cookieController.setUserIDCookie,
    (req, res) => res.status(200).json(res.locals));


module.exports = router;