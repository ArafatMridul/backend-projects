import express from "express";
import {authMiddleware} from "../middleware/auth.middleware.js";
import {
    addToWatchlistController,
    getWatchlistController,
    removeFromWatchlistController,
    updateWatchlistStatusController
} from "../controller/watchlist.controller.js";

const router = express.Router();

router.use(authMiddleware)

router.get("/get-watchlist", getWatchlistController)
router.post("/add-to-watchlist/:movieId", addToWatchlistController)
router.delete("/remove-from-watchlist/:movieId", removeFromWatchlistController)
router.patch("/update-watchlist/:movieId", updateWatchlistStatusController)

export default router;