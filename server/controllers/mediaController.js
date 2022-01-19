// grab database from models folder
// const db = require('../models/userModels');

// const mediaController = {};

// // get all media activities for user_id
// mediaController.getList = (req, res, next) => {
//   // const id = req.query.user_id; // when we have more than one user
//   const query = 'SELECT * FROM media WHERE user_id = 1;';
//   db
//     .query(query)
//     .then(result => {
//       res.locals.media = result.rows;
//       // console.log('res.locals.media: ', res.locals.media);
//       return next();
//     })
//     .catch(e => {
//       console.log('error at mediaController.getList', e);
//       return next({
//         log: 'Express error handler caught in getList middleware error',
//         message: { err: 'An error occurred in getList middleware error' }
//       });
//     });
// };

// mediaController.addMedia = (req, res, next) => {
//   // const user_id = req.query.user_id;
//   const query = 'INSERT INTO media(title, category, duration, priority, url, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING media_id;';

//   const data = [
//     req.body.title,
//     req.body.category,
//     req.body.duration,
//     req.body.priority,
//     req.body.url,
//     req.body.user_id
//   ];

//   db.query(query, data)
//     .then(() => {
//       // console.log('req.body from addMedia controller:', req.body)
//       // console.log('response from addMedia controller:', response);
//       res.locals.mediaItem = req.body;
//       return next();
//       // console.log(res.locals.film);
//     })
//     .catch(e => {
//       console.log('error at mediaController.addMedia', e);
//       return next({
//         log: 'Express error handler caught in addMedia middleware error',
//         message: { err: 'An error occurred in addMedia middleware error' }
//       });
//     });
// };

// mediaController.updateMedia = (req, res, next) => {
//   // const user_id = req.query.user_id;
//   const media_id = req.params.media;
//   // $1 = whichever column user is editing FROM REQ PARAMS
//   // $2 = new info to update FROM REQUEST BODY  
//   const query = 'UPDATE media SET title = $1, category = $2, duration = $3, priority = $4, url = $5, user_id = $6 WHERE media_id = $7';

//   const data = [
//     req.body.title,
//     req.body.category,
//     req.body.duration,
//     req.body.priority,
//     req.body.url,
//     req.body.user_id,
//     media_id
//   ];

//   db.query(query, data)
//     .then(() => {
//       res.locals.updatedMedia = req.body;
//       return next();
//     })
//     .catch(e => {
//       console.log('error at mediaController.updateMedia', e);
//       return next({
//         log: 'Express error handler caught in updateMedia middleware error',
//         message: { err: 'An error occurred in updateMedia middleware error' }
//       });
//     });
// };

// mediaController.deleteMedia = (req, res, next)=>{
//   const id = req.params.media;
//   const query = 'DELETE FROM media WHERE media_id = $1;';

//   db
//     .query(query, [id])
//     .then(() => {
//       console.log('media deleted!');
//       return next();
//     })
//     .catch(e => {
//       console.log('error at mediaController.deleteMedia', e);
//       return next({
//         log: 'Express error handler caught in deleteMedia middleware error',
//         message: { err: 'An error occurred in deleteMedia middleware error' }
//       });
//     });

// };

// module.exports = mediaController;
