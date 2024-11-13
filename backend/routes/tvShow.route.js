import express from "express"
import { getDetailTvShow, getSimilarTvShows, getTrailerTvShow, getTrendingTvShow, getTvShowsByCategory } from "../controllers/tvShow.controller.js";

const route = express.Router();

route.get("/trending",getTrendingTvShow)
route.get("/:id/trailers",getTrailerTvShow)
route.get("/:id/details",getDetailTvShow)
route.get("/:id/similars",getSimilarTvShows)
route.get("/:category",getTvShowsByCategory)


export default route