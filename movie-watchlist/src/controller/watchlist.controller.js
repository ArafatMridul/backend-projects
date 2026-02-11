import {
    getWatchlistService, addToWatchlistService, removeFromWatchlistService, updateWatchlistStatusService,
    getMovieByIdService,
} from "../service/watchlist.service.js";


export const getWatchlistController = async (req, res) => {
    const userId = req.userId;

    try {
        const watchlist = await getWatchlistService(userId);
        res.json({success: true, data: watchlist})
    } catch (e) {
        res.status(400).json({success: false, message: e.message})
    }
}

export const addToWatchlistController = async (req, res) => {
    const userId = req.userId;
    const {movieId} = req.params;

    try {
        const existingEntry = await getMovieByIdService(movieId, userId);
        if(existingEntry) {
            return res.status(400).json({success: false, message: "Movie already in watchlist"})
        }

        await addToWatchlistService(userId, movieId);
        res.json({success: true, message: "Movie added to watchlist"})
    } catch (e) {
        res.status(400).json({success: false, message: e.message})
    }
}

export const removeFromWatchlistController = async (req, res) => {
    const userId = req.userId;
    const {movieId} = req.params;

    try {
        const deletedMovieId = await removeFromWatchlistService(userId, movieId);
        if(!deletedMovieId) {
            return res.status(400).json({success: false, message: "Movie not found in watchlist"})
        }
        res.json({success: true, message: `Movie with ID ${deletedMovieId.movieId} removed from watchlist`})
    } catch (e) {
        res.status(400).json({success: false, message: e.message})
    }
}

export const updateWatchlistStatusController = async (req, res) => {
    const userId = req.userId;
    const {movieId} = req.params;
    const {status} = req.body;

    try {
        await updateWatchlistStatusService(userId, movieId, status);
        res.json({success: true, message: "Watchlist status updated"})
    } catch (e) {
        res.status(400).json({success: false, message: e.message})
    }
}