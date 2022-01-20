const User = require('../models/userModel');
const db = require('../models/sqlModel');
const fetch = require('node-fetch');
const axios = require('axios');

const imdbController = {};

const mediaDetailUrl = 'https://imdb-api.com/en/API/Title/k_q0ismqsp/';

//  Communicate with api and get the media detail
imdbController.getMediaDetail = (req, res, next) => {

  //  if the document already exists, return next
  if (res.locals.alreadyExist === true) return next();
  
  //  Store imdbID 
  const { imdbID, image } = req.body;

  //  Fetch data from API
  fetch(mediaDetailUrl + imdbID)
    .then(response => response.json())
    .then(data => {
      const media = {
        "title": data.title,
        "year": data.year,
        "type": data.type,
        "runtimeMins": data.runtimeMins,
        "plot": data.plot,
        "genres": data.genres,
        "rating": data.imDbRating,
        "contentRating": data.contentRating,
        "awards": data.awards,
        "directors": data.directors.split(', '),
        "stars": data.stars.split(', '),
        "imdbID": data.id,
        "posterUrl": image
      }

      // console.log(media);
      //  Store detail in locals
      res.locals.mediaDetail = media;
      next();
    })
    .catch(error => {
      console.log('error at imdbController.getMediaDetail', error);
      return next({
        log: 'Express error handler caught in imdbController.getMediaDetail error',
        message: { err: 'An error occurred' }
      });
    });
}

//  Communicate with API to get a list of matching media
imdbController.getMovieMatches = (req, res, next) => {
  //  create the url and store the key word for searching
  const url = "https://imdb-api.com/en/API/Search/k_q0ismqsp/"
  const searchedTerm = req.body.keywords;

  //fetch all possible matches from movieImdb
  axios.get(url + searchedTerm)
    .then((response) => {
      //  Store response result in locals
      res.locals.mediaList = response.data.results;
      next();
    })
    .catch(error => {
      console.log('error at imdbController.getMovieMatches', error);
      return next({
        log: 'Express error handler caught in imdbController.getMovieMatches error',
        message: { err: 'An error occurred' }
      });
    });
}


module.exports = imdbController;



