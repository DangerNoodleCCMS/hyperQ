const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

//  import the routers
const userRouter = require('./routes/user');
// const Controller = require('./controllers/mediaController');

//  Connect mongo database
const MONGO_URI = 'mongodb+srv://dangernoodle:dangernoodle@iterationproject.thynf.mongodb.net/iterationProject?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, {dbName: 'iterationProject'});

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serving static files
app.use(express.static(path.resolve(__dirname, '../build')));

/**
 * define route handlers
 */

// app.post('/',
//   mediaController.addMedia,
//   (req, res) => res.status(200).json(res.locals.mediaItem)
// );
app.use(cors({
  origin: '*'
}));

app.use('/user', userRouter);

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 404,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;