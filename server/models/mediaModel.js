const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//  Create the media schema
const mediaSchema = new Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    type : { type: String, required: true },
    runtimeMins: { type: Number, required:true },
    plot: { type: String, required: true },
    genres: { type: String, required: true },
    rating: { type: Number, required: true },
    contentRating: { type: String },
    awards: String,
    directors: [{ type: String, required: true }],
    stars: [{ type: String, required: true }],
    imdbID:{ type: String, required: true, unique: true }
});


module.exports = mongoose.model('media', mediaSchema);
