const User = require('../models/userModel');
const db = require('../models/sqlModel');

const userController = {};


//  Handle sign up request
userController.signup = async (req, res, next) => {
    //  Destructure and store username and password
    const { username, password } = req.body;

    try {
        //  Create user document in mongodb
        const mongoResponse = await User.create({ username, password });

        //  Store the newly created document id in locals
        res.locals.id = mongoResponse.id;

        //  Create a placeholder for the priority lists
        const priorityLists = {};

        //  Create the three priority list for the user and store it in res.locals
        const createQuery = 'INSERT INTO priority_lists (name, user_id) VALUES ($1, $2) RETURNING *';
        for (let i = 1; i < 4; i++) {
            const listName = `priority${i}`
            data = [listName, mongoResponse.id];
            const sqlResponse = await db.query(createQuery, data);
            priorityLists[listName] = {
                "id": sqlResponse.rows[0].id,
                "items": [],
            };
        }

        // Store the priority lists in locals
        res.locals.priorityLists = priorityLists;
        next();
    } catch (err) {
        console.log(err);
        next({
            log: 'Express error handler caught in userController.signup error',
            message: { err: 'An error occurred' }
        });
    }
};

userController.login = async (req, res, next) => {
    //  Destructure and store username and password
    const { username, password } = req.body;

    try {
        //  find user document in mongodb
        const user = await User.findOne({ username });

        //  Validate the password and store its result
        const isMatching = await user.validatePassword(password);

        //  If password does not match pass the error object to global handler
        if(!isMatching){
            res.locals.creationErr = 'Invalid username or password';
            return next({
                        log: 'Express error handler caught an error in the login middleware',
                        message: { err: 'An error occurred in login middleware' }
                      });
        } 

        //  Store the user id from mongo into local
        res.locals.id = user.id;
        next();
    } catch (err) {
        console.log(err);
        next({
            log: 'Express error handler caught in userController.login error',
            message: { err: 'An error occurred' }
        });
    }
};


// EXPORT THE CONTROLLER 
module.exports = userController;