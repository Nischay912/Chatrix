import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { ENV } from "../lib/env.js"

// step174: so now in this lets create the function protectRoute toi check for authentication before sending back a response ; acting like a middleware in between there.

// step176: we have also sent "next" function in parameters as it will be used to clal the next function if the protectRoute function runs successfully ; its basically for the auth.route.js file where we told that the next function of updateProfile will run after this protectRoute function runs successfully thus here.
export const protectRoute = async(req,res,next) =>{
    try {
        // step175: as discussed earlier , lets now create a check for token exists or not.

        // step177: so lets extract the token named "jwt" when we created it in utils.js file from the cookies of the user ; and store it in a variable called "token" now.

        // step178: see next steps in server.js file now.

        // step181: so due to cookie-parser package , we have access of the cookie in the req.cookies object now.
        const token = req.cookies.jwt;

        // step182: now if the token not exists , means that user is not logged in , then we will throw an error now.
        if(!token){

            // step183: status of unauthorized is 401 returned with message below.
            return res.status(401).json({ message: "User is un-authorized - No token provided" });

        }
        // step184: but if the user has a token , lets decode it below now ; so we will use the secret key to verify the token is valid or not now.
        const decoded = jwt.verify(token , ENV.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({ message: "User is un-authorized - Invalid token" });
        }

        // step185: if the token is valid ; now since in utils.js ; we had put userId in the token ; so we can verify the user using this now here below.

        // step186: so we can check for the user in the database , whose token is ther ein browser i.e. the user who is logged in.

        // the select("-password") will exclude the password from the user object , as we don't want to send the password as response anywhere to the client ever.
        const user = await User.findById(decoded.userId).select("-password");

        // step187: now if user not found again send a user not found error message here below and return.
        if(!user){

            // step188: used 404 status code as it is used for not found error status.
            return res.status(404).json({ message: "User not found" });
        }

        // step189: now if none of above errors return out of the function means : everything is correct , so we can add this user to give requets , so that : we can use this user rto give requests in the next functions to be called ahead ; by attaching this user field to "req" we are saying that : This request belongs to this authenticated user. Let the next functions/routes have access to this user data ; so now the next function when called below was the updateProfile function written next to after this protectRoute there in auth.route.js file ; so now that function updateProfile can access the user data in the req object ; and can perform operations on the user data ; like updating the profile picture or name of the user etc.

        // step190: so to make the user's data be accessible in the next functions ; we can attach the user data to the req object now here below.
        req.user = user;
        next();
        
    } catch (error) {
        // step191: can now console log any error to prevent application to crash and instead have some console logs for the error instead here below.
        console.error("Error in protectRoute middleware",error);
        res.status(500).json({ message: "Internal Server Error" });

        // step192: see the next steps in the auth.route.js file now there.
    }
}