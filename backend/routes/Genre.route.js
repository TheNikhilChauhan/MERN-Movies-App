import express from "express";

const router = express.Router();

//Controller
import {
  createGenre,
  updateGenre,
  removeGenre,
  listGenres,
  readGenre,
} from "../controllers/Genre.controller.js";

//Middleware
import {
  authenticated,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";

router.route("/").post(authenticated, authorizeAdmin, createGenre);
router.route("/:id").put(authenticated, authorizeAdmin, updateGenre);
router.route("/:id").delete(authenticated, authorizeAdmin, removeGenre);
router.route("/genres").get(listGenres);
router.route("/:id").get(readGenre);

export default router;
