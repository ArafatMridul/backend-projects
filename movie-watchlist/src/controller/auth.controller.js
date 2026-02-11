import {addNewUser, getUserByEmail} from "../service/auth.service.js";

// export const loginController = (req, res) => {
//     const
// }

export const signupController = async (req, res) => {
    const {name, email, password} = req.body;

    const user = await getUserByEmail(email);

    if(user) {
        return res.status(400).json({success: false, message: "User already exists"});
    }

    const newUser = await addNewUser(name, email, password);

    return res.status(201).json({success: true, message: "User created successfully", userId: newUser.id});
}