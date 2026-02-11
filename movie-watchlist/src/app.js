import express from "express";
import "dotenv/config"
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import watchlistRoutes from "./routes/watchlist.route.js";

const PORT = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/watchlist", watchlistRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

