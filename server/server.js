const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

//  import  routers
const userRouter = require('./routes/user');
const apiRouter = require('./routes/api');

//  Connect mongo database
const MONGO_URI = 'mongodb+srv://dangernoodle:dangernoodle@iterationproject.thynf.mongodb.net/iterationProject?retryWrites=true&w=majority';
mongoose.connect(MONGO_URI, { dbName: 'iterationProject' });

// handle parsing request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// serving static files
app.use(express.static(path.resolve(__dirname, '../build')));
app.use(cors({
  origin: '*'
}));

// Apply routers to path
app.use('/user', userRouter);
app.use('/api', apiRouter);


//  Handle all unknown request
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

//  Global Error Handler
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

//  listen to PORT
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;