import {pgEnum, pgTable, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import {singlestoreEnum} from "drizzle-orm/singlestore-core";

export const statusEnum = pgEnum("status", ["TO-WATCH", "WATCHING", "WATCHED"]);

export const usersTable = pgTable("users", {
    id: uuid().defaultRandom().primaryKey(),
    name: varchar({length: 255}).notNull(),
    email: varchar({length: 255}).notNull().unique(),
    password: varchar({length: 255}).notNull(),

    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow().$onUpdate(() => new Date()),
});

export const moviesTable = pgTable("movies", {
    id: uuid().defaultRandom().primaryKey(),
    title: varchar({length: 255}).notNull(),
    description: varchar({length: 1024}),
    director: varchar({length: 255}),
    durationMinutes: varchar({length: 10}),
    releaseDate: timestamp(),

    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow().$onUpdate(() => new Date()),
});

export const watchlistTable = pgTable("watchlist", {
    id: uuid().defaultRandom().primaryKey(),
    userId: uuid().notNull().references(() => usersTable.id, {onDelete: "cascade"}),
    movieId: uuid().notNull().references(() => moviesTable.id, {onDelete: "cascade"}),
    status: statusEnum().notNull().default("TO-WATCH"),

    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow().$onUpdate(() => new Date()),
})