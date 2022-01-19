const express = require('express');

const imdbController = require('../controllers/imdbController');
const dbController = require('../controllers/dbController');


// const router = express.Router();


router.post('/getMediaList',
    imdbController.getMovieMatches,
    (req, res) => res.sendStatus(200)
);

router.post('/addMedia',
    imdbController.getMediaDetail,
    dbController.createMediaMongoDoc,
    dbController.createMediaSQL,
    dbController.insertMediaPriority,
    (req, res) => res.status(200).json(res.locals.mediaDetail)
);

module.exports = router;