// const express = require('express');

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


// router.patch('/:media', mediaController.updateMedia, (req, res) => res.status(200).json(res.locals.updatedMedia)
// );

// // Delete a media from the database
// // http://localhost:3000/api/"media_id"
// router.delete('/:media', mediaController.deleteMedia, (req, res) => {
//   res.status(200).send();
// });

// module.exports = router;