import {db} from "../drizzle/db.js"
import {usersTable} from "../drizzle/schema.js";
import {eq} from "drizzle-orm";

export const getUserByEmail = async (email) => {
    const user = await db.select().from(usersTable).where(eq(usersTable.email, email));
    return user[0];
}

export const addNewUser = async (name, email, password) => {
    const newUser = await db.insert(usersTable).values({name, email, password}).returning({
        id: usersTable.id,
    });
    return newUser[0];
}