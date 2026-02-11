import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const generateHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const checkPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

export const generateJWTToken = (payload) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    return jwt.sign(payload, secretKey, {expiresIn: "1h"});
}

export const verifyJWTToken = (token) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
}