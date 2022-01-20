const mongo = require('../models/mediaModel');
const sql = require('../models/sqlModel');

const dbController = {};

//  Handle request for creating media doc in Mongodb
dbController.createMediaMongoDoc = (req, res, next) => {
    //  if the document already exists, return next
    if (res.locals.alreadyExist === true) return next();

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
    //  if the document already exists, return next
    if (res.locals.alreadyExist === true) return next();

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
dbController.insertMediaPriority = async (req, res, next) => {
    try {
        //  create a placeholder for SQL id
        let SQLId;

        //  if we did not create the sql through previous controller, run a query to SQL db and get the id
        if (res.locals.sqlId !== undefined) SQLId = res.locals.sqlId;
        else {
            const SQLquery = 'SELECT id FROM media WHERE mongo_id = $1';
            const response = await sql.query(SQLquery, [res.locals.mongoId]);
            SQLId = response.rows[0].id;
        }

        //  Create query string
        const insertMediaPriority = 'INSERT INTO media_priority_lists (list_id, media_id, priority) VALUES ($1, $2, $3)';

        //  Insert the media into media prioity lists table
        await sql.query(insertMediaPriority, [req.body.listId, SQLId, req.body.length]);

        next();
    } catch (error) {
        // if an error occur, pass to global error handler
        console.log('error at dbController.insertMediaPriority', error);
        return next({
            log: 'Express error handler caught in dbController.insertMediaPriority error',
            message: { err: 'An error occurred' }
        });
    }
}

//  Handle request for delete a particular media from the priority list 
dbController.deleteMediaPriority = (req, res, next) => {
    //  Destructure and store the priority list id and media id
    const { listId, SQLId } = req.body;
    // console.log(req.body); 

    //  Create query string
    const deleteMediaPriority = 'DELETE FROM media_priority_lists WHERE media_id = $1 AND list_id = $2';

    //  delete the media from media prioity lists table
    sql.query(deleteMediaPriority, [SQLId, listId])
        .then(() => next())
        // if an error occur, pass to global error handler
        .catch(error => {
            console.log('error at dbController.deleteMediaPriority', error);
            return next({
                log: 'Express error handler caught in dbController.deleteMediaPriority error',
                message: { err: 'An error occurred' }
            });
        });
}

//  Handle request that asks for the full object of the lists and corresponding items
dbController.getListsDataObject = async (req, res, next) => {
    if (res.locals.id === undefined) res.locals.id = req.cookies.userID;

    //  Create a placeholder for the priority lists
    const priorityLists = {};

    try {
        //  Query and get all the lists and their items of the user
        const listQuery = 'SELECT pl.id, pl.name AS list_name, m.title, m.year, m.genres, m.type, m.length, mpl.priority, m.mongo_id, m.id AS SQL_id FROM priority_lists pl LEFT JOIN media_priority_lists mpl ON pl.id = mpl.list_id LEFT JOIN media m ON mpl.media_id = m.id WHERE pl.user_id = $1';

        const sqlResponse = await sql.query(listQuery, [res.locals.id]);

        //  Construct the list object 
        for (let i = 0; i < sqlResponse.rows.length; i++) {
            if (priorityLists[sqlResponse.rows[i].list_name] === undefined) {
                priorityLists[sqlResponse.rows[i].list_name] = {
                    "id": sqlResponse.rows[i].id,
                    "items": [],
                };
            }

            if (sqlResponse.rows[i].title !== null) {
                // console.log(sqlResponse.rows[i].sql_id);
                const genresArr = sqlResponse.rows[i].genres.split(", ");
                const genres = {};
                for (let i = 0; i < genresArr.length; i++) {
                    genres[genresArr[i]] = true;
                }
                const item = {
                    "title": sqlResponse.rows[i].title,
                    "year": sqlResponse.rows[i].year,
                    "type": sqlResponse.rows[i].type,
                    "genres": genres,
                    "length": sqlResponse.rows[i].length,
                    "priority": sqlResponse.rows[i].priority,
                    "SQLId": sqlResponse.rows[i].sql_id,
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
            log: 'Express error handler caught in dbController.getListsDataObject error',
            message: { err: 'An error occurred' }
        });
    }
}

//  Get the corresponding document from mongo given the imdb id
dbController.getMediaSpecific = (req, res, next) => {
    //  Store imdbID 
    const { imdbID } = req.body;

    mongo.findOne({ imdbID })
        .then((response) => {
            if (response !== null) {
                //  create a key to indicate the document already exists
                res.locals.alreadyExist = true;
                res.locals.mongoId = response.id;
                res.locals.mongoData = response;
            }
            next();
        })
        .catch(error => {
            console.log('error at dbController.getMediaSpecific', error);
            return next({
                log: 'Express error handler caught in dbController.getMediaSpecific error',
                message: { err: 'An error occurred' }
            });
        });
}


module.exports = dbController;