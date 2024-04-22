import jwt from "jsonwebtoken";
import User from "../models/User.model";
import asyncHandler from "./asyncHandler";

//Check if the user is authenticated or not

const authenticated = asyncHandler(async (req, res, next) => {
  let token;

  //read JWT from the 'jwt' cookie
  token = req.cookie.jwt;

  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

//check if the user is admin or not
const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin");
  }
};

export { authenticated, authorizeAdmin };
