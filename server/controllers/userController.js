const fs = require('fs');
const path = require('path');
const User = require('../models/userModel');
const db = require('../models/sqlModel');

const userController = {};


userController.signup = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        //  Create user document in mongodb
        const mongoResponse = await User.create({ username, password });
        res.locals.id = mongoResponse.id;

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

        // console.log(priorityLists);
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
    const { username, password } = req.body;

    try {
        //  find user document in mongodb
        const mongoResponse = await User.findOne({ username, password });
        res.locals.id = mongoResponse.id;

        const priorityLists = {};

        //  Query and get all the list of the user
        const listQuery = 'SELECT pl.* FROM priority_lists pl LEFT JOIN media_priority_lists mpl ON pl.id = mpl.list_id LEFT JOIN media m ON mpl.media_id = m.id LEFT JOIN genres g ON m.genre_id = g.id LEFT JOIN categories c ON m.category_id = c.id WHERE pl.user_id = $1';
        
        const sqlResponse = await db.query(listQuery, [res.locals.id]);

        //  Construct the list object ------------ To be finished
        for (let i = 0; i < sqlResponse.rows.length; i++) {
            if (priorityLists[sqlResponse.rows[i].name] === undefined){
                priorityLists[sqlResponse.rows[i].name] = {
                    "id": sqlResponse.rows[i].id,
                    "items": [],
                };
            }
        }

        // console.log(priorityLists);
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