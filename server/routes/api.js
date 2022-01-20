const express = require('express');

const router = express.Router();

//  Import controllers
const imdbController = require('../controllers/imdbController');
const dbController = require('../controllers/dbController');


/************************************************/
//////////////  route: /getMediaList /////////////
/************************************************/

//  Handle the request that search for movies
router.post('/getMediaList',
    imdbController.getMovieMatches,
    (req, res) => res.status(200).json(res.locals.mediaList)
);


/************************************************/
////////////////  route: /getMedia ///////////////
/************************************************/

//  Handle the request that add a particular media to data base
router.post('/addMedia',
    imdbController.getMediaDetail,
    dbController.createMediaMongoDoc,
    dbController.createMediaSQL,
    dbController.insertMediaPriority,
    (req, res) => res.status(200).json(res.locals.mediaDetail)
);


module.exports = router;