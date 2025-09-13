// step48: we'll be connecting to our database from here , using "mongoose" , so lets import it first here below.
import mongoose from 'mongoose'

// step49: then lets create an async function to connect to the db.
export const connectDB = async () => {
    try{

        // CAN CHECK AT START ONLY IF THE ENV VARIABLE IS NOT DEFINED , THROW ERROR AND EXIT IMMEDIATELY , NO USE TO PROCEED.
        const { MONGO_URI } = process.env;
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is not defined or set");
        }

        // step50: connect to the database using the connection string we had.
        const conn = await mongoose.connect(process.env.MONGO_URI)

        // step51: can console log success message too here along with the host (server address) of the MongoDB you are connected to.
        console.log("Connected to MongoDB: ", conn.connection.host)
    }
    catch(error){
        // step52: can console log error message too here if any and exit with status code of 1 : "1" status code means "failed" and "0" means "success".

        // step53: see the next steps in server.js file now there.
        console.error("Error connecting to MongoDB", error)
        process.exit(1)
    }
}