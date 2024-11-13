import express from "express"
import { getDetailMovie, getMoviesByCategory, getSimilarMovies, getTrailerMovie, getTrendingMovie } from "../controllers/movie.controller.js";

const route = express.Router();

route.get("/trending",getTrendingMovie)
route.get("/:id/trailers",getTrailerMovie)
route.get("/:id/details",getDetailMovie)
route.get("/:id/similars",getSimilarMovies)
route.get("/:category",getMoviesByCategory)


export default route