import 'dotenv/config';
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/drizzle/schema.js",
    out: "./src/drizzle",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});

