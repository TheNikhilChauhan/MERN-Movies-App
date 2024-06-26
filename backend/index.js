import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

//files
import connectDB from "./config/db.js";
import userRoutes from "./routes/User.route.js";
import genreRoutes from "./routes/Genre.route.js";
import movieRoutes from "./routes/Movie.route.js";
import uploadRoutes from "./routes/Upload.route.js";

//configuration
dotenv.config();

connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

//Routes

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
