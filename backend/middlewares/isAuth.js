import jwt from "jsonwebtoken";
import User from '../models/user.js';


const isAuth = async (req, res, next) => {
    console.log("isAuth Middleware Invoked");
    try {
        const token = req.cookies.token; // read the token from the cookie
        console.log("Token from cookie:", token);
        if(!token){
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decode.id); // fetch user details and attach to req.user
        console.log("user attached to req")
        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}

export default isAuth;