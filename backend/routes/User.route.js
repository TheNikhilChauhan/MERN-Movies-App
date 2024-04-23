import express from "express";

//controllers
import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUserProfile,
} from "../controllers/User.controller.js";

//middlewares
import {
  authenticated,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createUser)
  .get(authenticated, authorizeAdmin, getAllUsers);
router.post("/auth", loginUser);
router.post("/logout", logoutUser);

router.route("/profile").get(authenticated, getCurrentUserProfile);

export default router;
