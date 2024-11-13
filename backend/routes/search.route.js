import express from "express"
import { deleteSearchHistory, getSearchHistory, searchMovie, searchPerson, searchTvShow } from "../controllers/search.controller.js";

const route = express.Router();
route.get("/person/:query",searchPerson)
route.get("/movie/:query",searchMovie)
route.get("/tvshow/:query",searchTvShow)
route.get("/history",getSearchHistory)
route.delete("/history/remove/:id",deleteSearchHistory)

export default route