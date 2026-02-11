import express from "express";
import {signupController, loginController, signoutController} from "../controller/auth.controller.js";
import {loginValidationMiddleware, signUpValidationMiddleware} from "../middleware/validate.middleware.js";

const router = express.Router();

router.post("/signup", signUpValidationMiddleware, signupController)
router.post("/login", loginValidationMiddleware, loginController)
router.get("/signout", signoutController)

export default router;

