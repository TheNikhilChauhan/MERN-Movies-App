import express from "express";

//controllers
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/User.controller.js";

//middlewares

const router = express.Router();

router.route("/").post(createUser);
router.post("/auth", loginUser);
router.post("/logout", logoutUser);

export default router;
