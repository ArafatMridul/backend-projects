import {addNewUser, getUserByEmail} from "../service/auth.service.js";
import {checkPassword, generateHashedPassword, generateJWTToken} from "../utils/auth.utils.js";

export const signupController = async (req, res) => {
    const {name, email, password} = req.body;

    const user = await getUserByEmail(email);

    if(user) {
        return res.status(400).json({success: false, message: "User already exists"});
    }

    const hashedPassword = await generateHashedPassword(password);

    const newUser = await addNewUser(name, email, hashedPassword);

    return res.status(201).json({success: true, message: "User created successfully", userId: newUser.id});
}

export const loginController = async (req, res) => {
    const {email, password} = req.body;

    const user = await getUserByEmail(email);

    if(!user) {
        return res.status(400).json({success: false, message: "User does not exist"});
    }

    const isPasswordValid = await checkPassword(password, user.password);

    if(!isPasswordValid) {
        return res.status(400).json({success: false, message: "Invalid password"});
    }

    const token = generateJWTToken({userId: user.id});
    res.cookies("jwt-token", token, {httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict"});

    return res.status(200).json({success: true, message: "Login successful", token});

}
