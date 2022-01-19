const User = require('../models/userModel');
const db = require('../models/sqlModel');
const fetch = require('node-fetch');
const axios = require('axios');

const imdbController = {};

const mediaDetailUrl = 'https://imdb-api.com/en/API/Title/k_q0ismqsp/';

//  Store userID in cookie
imdbController.getMediaDetail = (req, res, next) => {
  const { mediaId } = req.body;
  fetch(mediaDetailUrl + mediaId)
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
        "stars": data.stars.split(', ')
      }
      res.locals.mediaDetail = media;
      // console.log(media);
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

imdbController.getMovieMatches = (req, res, next) => {
  //fetch all poss matches from movieImdb
  const searchedMovie = req.params.movie;
  const url = "https://imdb-api.com/en/API/SearchMovie/"
  const apiKey = "k_q0ismqsp"
  const searchedTerm = "inception"

  axios.get(`https://imdb-api.com/en/API/Search/${apiKey}/${searchedTerm}`)
    .then((res) => {
      console.log(res.data);
      console.log(res.data.results);
      // res.locals.matches = res.data.results;
      next();
    })
}


module.exports = imdbController;



