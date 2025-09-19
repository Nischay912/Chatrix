// step716: first lets get the required imports here below.
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { ENV } from "../lib/env.js"

// step717: now lets create the middleware function to run when middleware is used there below.

// step718: now lets pass :socket" which is the user connected from the frontend ; and next will be the next function written after this middleware wherever its called ; so that after this middleware that function will be called there.
export const socketAuthMiddleware = async(socket , next) => {
    try {
        // step719: lets extract the token from the http-only cookies using the code here below.
        const token = socket.handshake.headers.cookie
        ?.split("; ")
        .find((row) => row.startsWith("jwt="))
        ?.split("=")[1];

        // step720: now lets check if token is valid or even exists or not.
        if(!token){
            console.log("Socket Connection Rejected: No token provided")

            // WHEN WE USE A MIDDLEWARE , WHEREVER THIS MIDDLEWARE FUNCTION WILL BE IMPORTED AND USED : THERE > WE WILL HAVE A FUNCTION WRITTEN AFTER THAT MIDDLEWARE FUNCTION ; AND BASED ON THIS MIDDLEWARE WE DECIDE WHETHER TO ALLOW THE CONNECTION OR NOT ; THATS WHY IF ERROR COMES WE WON'T RUN THAT FUNCTION WRITTEN AFTER IT THERE , ELSE WE WILL.
            return next(new Error("Unauthorized - No Token Provided"))
        }

        // step721: if token exists verify it here below.
        const decoded = jwt.verify(token , ENV.JWT_SECRET) //same written in auth.middleware.js file
        if(!decoded){
            console.log("Socket Connection Rejected: Invalid Token")
            return next(new Error("Unauthorized - Invalid Token"))
        }

        // step722: finally if token is valid find him in the database using the code below.
        const user = await User.findById(decoded.userId).select("-password") //same as written in auth.middleware.js file
        if(!user){
            // step723: if user not found throw an error.
            console.log("Socket Connection Rejected: User not found")
            return next(new Error("User Not Found"))
        }
        // step724: else connect the user with the socket connection here below.

        // step725: its almost the same code we wrote in auth.middleware.js file ; but instead of "req" now we are using "socket" connection here below ; so we connected the user's info to the socket here below.
        socket.user = user;
        socket.userId=user._id.toString()

        // step726: finally give a console log and after that we will call the next function safely after passing through and after running of this middleware function here below.

        // step727: see the next steps in "socket.js" file now there.
        console.log(`Socket authenticated for user: ${user.fullName} (${user._id})`);
        next();

    } catch (error) {
        console.log("Error in socket authentication:" , error.message)
        next(new Error("unauthorized - Authentication failed"))
    }
}