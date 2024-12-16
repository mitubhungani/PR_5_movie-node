const express = require("express");
const path = require("path");
const Cookies = require("cookie-parser");
const DBConnect = require("./config/db");
const userRouter = require("./router/user.route");
const isLogin = require("./middleware/auth.middleware");
const movieRouter = require("./router/movie.route");
const Movie = require("./model/movie.model");

const app = express();
app.use(Cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/movies", isLogin,async (req, res) => {
  let movie = await Movie.find()
  console.log('movie home page',movie);
  console.log('movie title',movie);
  
  res.render("index",{movie});
});

app.get('/', isLogin,async (req, res) => {
  res.send('Welcome to the movie API')
})

app.use("/user", userRouter);
app.use("/movie", movieRouter);

app.listen(8090, () => {
  console.log("Server started on port 8090");
  DBConnect()
});
