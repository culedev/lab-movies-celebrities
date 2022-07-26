const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// GET/POST Create new movie "/movies/create"
router.get("/create", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find().select("name");
    res.render("movies/new-movie.hbs", { allCelebrities });
  } catch (err) {
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  try {
    await Movie.create({ title, genre, plot, cast });
    res.redirect("/movies");
  } catch (err) {
    next(err);
  }
});

// GET List of movies "/movies"
router.get("/", async (req, res, next) => {
  try {
    const allMovies = await Movie.find();
    console.log(allMovies);
    res.render("movies/movies.hbs", { allMovies });
  } catch (err) {
    next(err);
  }
});

// GET MOVIE DETAILS "/movies/:movieId"
router.get("/:movieId", async (req, res, next) => {
  const { movieId } = req.params;

  try {
    const eachMovie = await Movie.findById(movieId).populate("cast");
    res.render("movies/movie-details.hbs", { eachMovie });
  } catch (err) {
    next(err);
  }
});

// GET/POST MOVIE EDIT "/movies/:movieId/edit"
router.get("/:movieId/edit", async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const eachMovie = await Movie.findById(movieId);
    const allCelebrities = await Celebrity.find();
    res.render("movies/edit-movie.hbs", { eachMovie, allCelebrities });
  } catch (err) {
    next(err);
  }
});

router.post("/:movieId/edit", async (req, res, next) => {
    const {movieId} = req.params
    const {title, genre, plot, cast} = req.body

    try {
        await Movie.findByIdAndUpdate(movieId, {title, genre, plot, cast})
        res.redirect(`/movies/${movieId}`)
    } catch (err) {
        next(err)
    }
});

// POST MOVIE DELETE "/movies/:movieId/delete"
router.post("/:movieId/delete", async (req, res, next) => {
  const { movieId } = req.params;

  try {
    await Movie.findByIdAndDelete(movieId);
    res.redirect("/movies");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
