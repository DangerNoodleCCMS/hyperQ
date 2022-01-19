const cookieController = {};

//  Store userID in cookie
cookieController.setUserIDCookie = (req, res, next) => {
  //attach a cookie to response with name ssid and value to be the id of the user in mongodb
  res.cookie('userID', res.locals.id, {
    //set the life of the cookie to be 3600000 ms (which is 3600 seconds = 1 hour)
    maxAge: 3600000,
    //set the cookie to be http only.
    httpOnly: true
  });
  next();
}

module.exports = cookieController;
