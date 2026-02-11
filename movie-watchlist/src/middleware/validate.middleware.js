import {loginSchema, signUpSchema} from "../validation/schema.js";

export const signUpValidationMiddleware = (req, res, next) => {
    const result = signUpSchema.safeParse(req.body);

    if(!result.success) {
        const errors = result.error.issues.map(issue => issue.message);
        return res.status(400).json({success: false, message: "Validation failed", errors});
    }

    next();
}

export const loginValidationMiddleware = (req, res, next) => {
    const result = loginSchema.safeParse(req.body);

    if(!result.success) {
        const errors = result.error.issues.map(issue => issue.message);
        return res.status(400).json({success: false, message: "Validation failed", errors});
    }

    next();
}