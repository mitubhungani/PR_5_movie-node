// const mongoose = require("mongoose");

// const movieSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   releaseDate: Number,
//   category: String,
//   actors: [{ name: String }],
//   image: String,
//   ratings: [{
//     value: { type: Number, min: 0, max: 10 }
//   }],
//   comments: [{text: String}],
//   addedBy: String,
// });


// const Movie = mongoose.model("Movie", movieSchema);

// module.exports = Movie;




// models/movie.schema.js

const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  actors: [{ 
    name: {
      type: String, 
      required: true 
    } 
  }],
  image: {
    type: String,
    required: true
  },
  ratings: [
    {
      value: {
        type: Number,
        required: true,
        min: 0,
        max: 10
      }
    }
  ],
  comments: [
    {
      text: {
        type: String,
        required: true
      }
    }
  ],
  addedBy: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
