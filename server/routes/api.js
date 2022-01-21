const express = require('express');

const router = express.Router();

//  Import controllers
const imdbController = require('../controllers/imdbController');
const dbController = require('../controllers/dbController');


/************************************************/
//////////////  route: /getMediaList /////////////
/************************************************/

//  Handle the request that search for movies
router.post('/getList',
    imdbController.getMovieMatches,
    (req, res) => res.status(200).json(res.locals.mediaList)
);


/************************************************/
//////////////////  route: /media ////////////////
/************************************************/

//  Handle the request that add a particular media to data base
router.post('/media',
    dbController.getMediaSpecific,
    imdbController.getMediaDetail,
    dbController.createMediaMongoDoc,
    dbController.createMediaSQL,
    dbController.insertMediaPriority,
    dbController.getListsDataObject,
    (req, res) => res.status(200).json(res.locals.priorityLists)
);

//  Handle the request that remove a particular media from data base
router.put('/media',
    dbController.deleteMediaPriority,
    dbController.getListsDataObject,
    (req, res) => res.status(200).json(res.locals.priorityLists)
);

//  Handle the get which ask for the dataObjects
router.get('/media',
    dbController.getListsDataObject,
    (req, res) => res.status(200).json(res.locals.priorityLists)
);


/************************************************/
//////////////////  route: /media ////////////////
/************************************************/

//  Handle the get which ask for the modal detail
router.post('/modal',
    dbController.getModalSpecific,
    (req, res) => res.status(200).json(res.locals.mongoData)
);


module.exports = router;