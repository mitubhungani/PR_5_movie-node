const Movie = require("../model/movie.model");
const User = require("../model/user.model");

const getMovie = async (req, res) => {
  try {
    let movie = await Movie.find();
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getMovieById = async (req, res) => {
  try {
    let { id } = req.params;
    let movie = await Movie.findById(id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createMovie = async (req, res) => {
  // try {
  //     // let {id} =req.cookies
  //     // console.log('id',id);

  //     let movie = await Movie.create(req.body)
  //     res.status(201).json(movie)
  // } catch (error) {
  //     res.status(500).send(error)
  // }

  try {
    // Destructure and format the incoming data
    const {
      title,
      description,
      releaseDate,
      category,
      actors,
      image,
      ratings,
      comments,
      addedBy,
    } = req.body;

    const { id } = req.cookies;
    // console.log("id", id);
    const user = await User.findById(id);
    // console.log("user", user);

    // Split actors and wrap each actor in an object
    const actorsArray = actors
      .split(",")
      .map((name) => ({ name: name.trim() }));

    // Wrap ratings in an array of objects
    const ratingsArray = [{ value: parseFloat(ratings) }];

    // Wrap comments in an array of objects
    const commentsArray = comments ? [{ text: comments }] : [];

    // Create the new movie object
    const newMovie = new Movie({
      title,
      description,
      releaseDate,
      category,
      actors: actorsArray,
      image,
      ratings: ratingsArray,
      comments: commentsArray,
      addedBy: user.username,
    });

    // Save the movie to the database
    await newMovie.save();
    res
      .status(201)
      .json({ message: "Movie added successfully!", movie: newMovie });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    let { id } = req.params;
    let movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
    console.log(movie);

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteMovie = async (req, res) => {
  try {
    let { id } = req.params;
    let movie = await Movie.findByIdAndDelete(id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).send(error);
  }
};

// const movieComment = async (req, res) => {
//   try {
//     let {id} = req.params
//     console.log("com-id", id);
//     let { comments } = req.body;
//     console.log("comments", comments);
//     let movie = await Movie.findById(id,{comments})
//     res.status(200).json(movie);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// }

const movieComment = async (req, res) => {
  try {
    let { id } = req.params;
    console.log("rat-id", id);

    let { comments } = req.body;
    console.log("rat", comments);
    let movie = await Movie.findByIdAndUpdate(
      id,
      { $push: { comments: { text: comments } } },
      { new: true }
    );

    console.log("Updated movie with new rating", movie);

    res.status(200).json(movie);
  } catch (error) {
    console.log("Error adding rating:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while adding the rating",
        details: error.message,
      });
  }
};

// const movieRating = async (req, res) => {
//   try {
//     let { id } = req.params;
//     console.log("rat-id", id);

//     let { ratings } = req.body;
//     console.log("rat", ratings);

//     let movie = await Movie.findByIdAndUpdate(id,ratings,{new:true});
//     console.log("movie", movie);

//     res.status(200).json(movie);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

const movieRating = async (req, res) => {
  try {
    let { id } = req.params;
    console.log("rat-id", id);

    let { ratings } = req.body;
    console.log("rat", ratings);

    const newRatingValue = parseFloat(ratings);

    let movie = await Movie.findByIdAndUpdate(
      id,
      { $push: { ratings: { value: newRatingValue } } },
      { new: true }
    );

    console.log("Updated movie with new rating", movie);

    res.status(200).json(movie);
  } catch (error) {
    console.log("Error adding rating:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while adding the rating",
        details: error.message,
      });
  }
};

const movieAdd = async (req, res) => {
  res.render("addmovie");
};

const movieFilter = async (req, res) => {
  try {
    const { title, addedBy, releaseDate, category } = req.query;
    console.log(req.query);

    const filter = {};
    if (title) filter.title = title;
    if (addedBy) filter.addedBy = addedBy;
    if (releaseDate) filter.releaseDate = releaseDate;
    if (category) filter.category = category;

    const movies = await Movie.find(filter);

    res.status(200).send(movies);
  } catch (error) {
    res.status(500).send("error filter", error);
  }
};

module.exports = {
  getMovie,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  movieRating,
  movieAdd,
  movieFilter,
  movieComment,
};
