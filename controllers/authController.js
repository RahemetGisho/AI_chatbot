import errorHandler from "../middlewares/errorMiddleware";
import { findOne, create } from "../models/userModel";
import errorResponse from "../utils/errorResponse";

// JWT TOKEN
export function sendToken(user, statusCode, res) {
    const token = user.getSignedToken(res);
    res.status(statusCode).json({
        success: true,
        token,
    });
}

//REGISTER
export async function registerContoller(req, res, next) {
    try {
        const { username, email, password } = req.body;
        //exisitng user
        const exisitingEmail = await findOne({ email });
        if (exisitingEmail) {
            return next(new errorResponse("Email is already registered", 400));
        }
        const user = await create({ username, email, password });
        sendToken(user, 201, res);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//LOGIN
export async function loginController(req, res, next) {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return next(new errorResponse("Please provide email or password"));
        }
        const user = await findOne({ email });
        if (!user) {
            return next(new errorResponse("Invalid Creditial", 401));
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new errorResponse("Invalid Creditial", 401));
        }
        //res
        this.sendToken(user, 200, res);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

//LOGOUT
export async function logoutController(req, res) {
    res.clearCookie("refreshToken");
    return res.status(200).json({
        success: true,
        message: "Logout Succesfully",
    });
}