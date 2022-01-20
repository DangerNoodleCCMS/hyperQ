const mongo = require('../models/mediaModel');
const sql = require('../models/sqlModel');

const dbController = {};

//  Handle request for creating media doc in Mongodb
dbController.createMediaMongoDoc = (req, res, next) => {
    //  creating media doc in Mongodb
    mongo.create(res.locals.mediaDetail)
        .then((response) => {
            //  Store the newly generated document's id
            res.locals.mongoId = response.id;
            next();
        })
        // if an error occur, pass to global error handler
        .catch(error => {
            console.log('error at dbController.createMongoDoc', error);
            return next({
                log: 'Express error handler caught in dbController.createMongoDoc error',
                message: { err: 'An error occurred' }
            });
        });
}

//  Handle request for creating the media in SQL
dbController.createMediaSQL = (req, res, next) => {
    //  Create the data for query
    const data = [
        res.locals.mediaDetail.title,
        res.locals.mediaDetail.year,
        res.locals.mediaDetail.genres,
        res.locals.mediaDetail.type,
        res.locals.mediaDetail.runtimeMins,
        res.locals.mongoId
    ];

    //  Create query string
    const insertMedia = 'INSERT INTO media (title, year, genres, type, length, mongo_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';

    sql.query(insertMedia, data)
        .then((response) => {
            //  Store the newly generated entry's id
            res.locals.sqlId = response.rows[0].id;
            // console.log(response);
            next();
        })
        // if an error occur, pass to global error handler
        .catch(error => {
            console.log('error at dbController.createMediaSQL', error);
            return next({
                log: 'Express error handler caught in dbController.createMediaSQL error',
                message: { err: 'An error occurred' }
            });
        });
}

//  Handle request for adding a particular media to the priority list 
dbController.insertMediaPriority = (req, res, next) => {
    //  Create query string
    const insertMediaPriority = 'INSERT INTO media_priority_lists (list_id, media_id, priority) VALUES ($1, $2, $3)';

    //  Insert the media into media prioity lists table
    sql.query(insertMediaPriority, [req.body.listId, res.locals.sqlId, req.body.length])
        .then(() => next())
        // if an error occur, pass to global error handler
        .catch(error => {
            console.log('error at dbController.insertMediaPriority', error);
            return next({
                log: 'Express error handler caught in dbController.insertMediaPriority error',
                message: { err: 'An error occurred' }
            });
        });
}


module.exports = dbController;