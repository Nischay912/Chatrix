// step196: copy the cloud name from the cloudinary.com website and save in .env file there.

// step197: now go in settings on cloudinary.com > api keys > generate new one > copy confirmation code from email , paste it > copy api key and secret > paste in .env file & also update the env.js file too now.

// step198: now set up cloudinary using the following lines of code ; where they use an object named "v2" which we are implementing using the "cloudinary" name here below.
import {v2 as cloudinary} from "cloudinary";
import { ENV } from "./env.js";

cloudinary.config({
    cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_API_SECRET
});

export default cloudinary;

// step199: see the next steps in auth.controller.js file now there.