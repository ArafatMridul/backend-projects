import {db} from "../drizzle/db.js";
import {watchlistTable} from "../drizzle/schema.js";
import {and, eq} from "drizzle-orm";

export const getWatchlistService = async (userId) => {
    try {
        return await db.select().from(watchlistTable).where(eq(watchlistTable.userId, userId));
    } catch (error) {
        console.error("Error fetching watchlist:", error);
        throw new Error("Failed to fetch watchlist");
    }
}

export const getMovieByIdService = async (movieId, userId) => {
    try {
        const entry = await db.select().from(watchlistTable).where(
            and(eq(watchlistTable.movieId, movieId),
                eq(watchlistTable.userId, userId))
        );
        return entry[0];
    } catch (error) {
        console.error("Error fetching movie from watchlist:", error);
        throw new Error("Failed to fetch movie from watchlist");
    }
}

export const addToWatchlistService = async (userId, movieId) => {
    try {
        await db.insert(watchlistTable).values({userId, movieId});
    } catch (error) {
        console.error("Error adding to watchlist:", error);
        throw new Error("Failed to add to watchlist");
    }
}

export const removeFromWatchlistService = async (userId, movieId) => {
    try {
        const deletedRow = await db.delete(watchlistTable).where(
            and(eq(watchlistTable.userId, userId),
                eq(watchlistTable.movieId, movieId))
        ).returning({movieId: watchlistTable.movieId});
        return deletedRow[0];
    } catch (error) {
        console.error("Error removing from watchlist:", error);
        throw new Error("Failed to remove from watchlist");
    }
}

export const updateWatchlistStatusService = async (userId, movieId, status) => {
    try {
        await db.update(watchlistTable).set({status}).where(
            and(eq(watchlistTable.userId, userId),
                eq(watchlistTable.movieId, movieId))
        );
    } catch (error) {
        console.error("Error updating watchlist status:", error);
        throw new Error("Failed to update watchlist status");
    }
}