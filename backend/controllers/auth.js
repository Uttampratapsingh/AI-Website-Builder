import User from "../models/user.js";
import jwt from 'jsonwebtoken';


export const googleAuth = async (req,res) =>{
    try {
        console.log("Google Auth called");
        const { name,email,avatar } = req.body; // Assuming the frontend sends these details
        
        if(!email || !name) {
            return res.status(400).json({ message: "Name and email are required" });
        }

        //choose let here because we might need to reassign the user variable if the user doesn't exist and we create a new one. if we use const then we won't be able to reassign it and it will throw an error when we try to assign a new user to it.
        let user = await User.findOne({ email }); // here both the email and name are unique so we can use either of them to find the user. otherwise we had to write {email:value_of_email}. but for now we getting it as a email from the frontend so we can directly use it as email.

        if(!user) {
            // If user doesn't exist, create a new one
            console.log("User not found, creating new user");
            user = new User({
                name,
                email,
                avatar
            });
            await user.save(); // Save the new user to the database
            // or we can directly use User.create() method to create and save the user in one step like this: const newUser = await User.create({name,email,avatar});
            console.log("New user created:", user);
        } 
        const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' }); // Generate JWT token for the new user

        res.cookie("token", token,{
            httpOnly:true, // Prevents client-side JavaScript from accessing the cookie
            secure:process.env.NODE_ENV === 'production', // Set secure flag in production
            sameSite:'strict',
            maxAge:7*24*60*60*1000 // 7 days in milliseconds
        })

        res.status(201).json({ message: "User Login successfully", user, token });
    } catch (error) {
        console.error("Error in Google Auth:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export const logout = (req,res) =>{
    console.log("Logout called");
    try {
        res.clearCookie("token",{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:'strict'
        });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error in Logout:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}