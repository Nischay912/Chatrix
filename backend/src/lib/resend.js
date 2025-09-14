// step127: lets import the resend package we installed here now below.
import {Resend} from "resend";

// step129: we need to import dotenv and call its config method first in order to use the environment variables present inside it there.
// import dotenv from "dotenv";
// dotenv.config();
import { ENV } from "./env";

// step128: create a resendClient using the resend api key below.

// step132: so we got the resend client to be used to send the emails & stored the sender information in the sender variable there below.

// step133: see the next steps in the "emailHandlers.js" file now there.
export const resendClient = new Resend(ENV.RESEND_API_KEY);

// step130: also lets write the sender function here below.
export const sender = {

    // step131: thus we are using the email and name from the ".env" file there.
    email: ENV.EMAIL_FROM,
    name: ENV.EMAIL_FROM_NAME
}