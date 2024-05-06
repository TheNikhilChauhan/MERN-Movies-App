import express from "express";
const router = express.Router();

//Controllers
import {
  createMovie,
  updateMovie,
  getAllMovies,
  getNewMovies,
  getRandomMovies,
  getSpecificMovie,
  getTopMovies,
  deleteMovie,
  deleteComment,
  movieReview,
} from "../controllers/Movie.controller.js";
import {
  authenticated,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";

//Public routes
router.get("/all-movies", getAllMovies);
router.get("/specific-movie/:id", getSpecificMovie);
router.get("/new-movies", getNewMovies);
router.get("/random-movies", getRandomMovies);
router.get("/top-movies", getTopMovies);

//Restricted Routes
router.post("/:id/reviews", authenticated, checkId, movieReview);

//Admin
router.post("/create-movie", authenticated, authorizeAdmin, createMovie);
router.put("/update-movie/:id", authenticated, authorizeAdmin, deleteMovie);
router.delete("/delete-comment", authenticated, authorizeAdmin, deleteComment);
router.delete("/delete-movie/:id", authenticated, authorizeAdmin, deleteMovie);

export default router;
