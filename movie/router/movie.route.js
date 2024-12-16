const {Router} = require('express')
const { getMovie, getMovieById, createMovie, updateMovie, deleteMovie, movieRating, movieAdd, movieFilter, movieComment } = require('../controller/movie.controller')
// const allMovieFildReqired = require('../middleware/movie.middleware')
const isLogin = require('../middleware/auth.middleware')

const movieRouter = Router()

movieRouter.get('/create',isLogin,movieAdd)
movieRouter.get('/filter',movieFilter)
movieRouter.patch('/comment/:id',movieComment)
movieRouter.patch('/rating/:id',movieRating)

movieRouter.get('/',getMovie)
movieRouter.get('/:id',getMovieById)
movieRouter.post('/create',createMovie)
movieRouter.patch('/update/:id',updateMovie)
movieRouter.delete('/delete/:id',deleteMovie)

module.exports = movieRouter;