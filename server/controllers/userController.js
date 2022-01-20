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

        //  Create a placeholder for the priority lists
        const priorityLists = {};

        //  Query and get all the lists and their items of the user
        const listQuery = 'SELECT pl.id, pl.name AS list_name, m.title, m.year, m.genres, m.type, m.length, mpl.priority, m.mongo_id, m.id AS SQL_id FROM priority_lists pl LEFT JOIN media_priority_lists mpl ON pl.id = mpl.list_id LEFT JOIN media m ON mpl.media_id = m.id WHERE pl.user_id = $1';

        const sqlResponse = await db.query(listQuery, [res.locals.id]);

        //  Construct the list object 
        for (let i = 0; i < sqlResponse.rows.length; i++) {
            if (priorityLists[sqlResponse.rows[i].list_name] === undefined) {
                priorityLists[sqlResponse.rows[i].list_name] = {
                    "id": sqlResponse.rows[i].id,
                    "items": [],
                };
            }

            if (sqlResponse.rows[i].title !== null) {
                const genresArr = sqlResponse.rows[i].genres.split(", ");
                const genres = {};
                for (let i = 0; i < genresArr.length; i++){
                    genres[genresArr[i]] = true;
                }
                const item = {
                    "title": sqlResponse.rows[i].title,
                    "year": sqlResponse.rows[i].year,
                    "type": sqlResponse.rows[i].type,
                    "genres": genres,
                    "length": sqlResponse.rows[i].length,
                    "priority": sqlResponse.rows[i].priority,
                    "SQLId": sqlResponse.rows[i].SQL_id,
                    "mongoId": sqlResponse.rows[i].mongo_id,
                };
                priorityLists[sqlResponse.rows[i].list_name].items.push(item);
            }
        }

        //  Store the list object in local
        res.locals.priorityLists = priorityLists;
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