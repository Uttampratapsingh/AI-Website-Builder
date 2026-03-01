export const getUser = (req,res) =>{
    console.log("Get User controller called");
    try {
        if(!req.user){
            return res.json({user:null});
        }
        console.log("User found in session:", req.user);
        res.json({user:req.user});
    } catch (error) {
        console.error("Error in getUser controller:", error);
        res.status(500).json({error:"Internal Server Error"});
    }
}