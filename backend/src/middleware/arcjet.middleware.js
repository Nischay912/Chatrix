// step223: we will now write a function to call this in our routes on the website there.

// step224: lets import the arcjet function from arcjet.js file now.
import arcjet from "../lib/arcjet.js"

// step225: from arcjet documentation , we also import isSpoofedBot here now below.
import { isSpoofedBot } from "@arcjet/inspect";

// step225: lets create the function now here below.
export const arcjetProtection = async(req,res,next) =>{
    try {

        // step228: now here we can have a decision to either block or accept the request(req).
        const decision = await arcjet.protect(req)

        // step229: then here below write the conditions to do what and when here below.

        // step230: so if the request is denied , we see why was it dneied here below.
        if(decision.isDenied()){
            // step230: if the request is denied due to rate limit exceed i.e. more requets comes than 100 per minute that we had set , then send the below response.
            if(decision.reason.isRateLimit()){
                return res.status(429).json({message : "Rate Limit Exceeded due to too many requests. Please try again later."})
            }

            // step231: if the request is denied due to it was detected a bot , then send the below response ; we prevent bots as they can overload your server with too many requests and thus the server database could fill with garbage ; so : By stopping them early, we can keep your server fast for real users.
            else if(decision.reason.isBot()){
                return res.status(403).json({message :"Bot detected. Please try again later."})
            }
            else{
                // step232: if the access was denied to some other reasons , then send the following response.
                return res.status(403).json({message:"Access denied by security policy."})
            }
        }

        // step233: now we will check for spoofedBots : spoofedBots are the type of bots that acts like human ; so they are very hard to be detected , but Arcjet can do it for us using the following code here below.
        if(decision.results.some(isSpoofedBot)){
            return res.status(403).json({
                error:"Spoofed bot detected",
                message:"Malicious bot activity detected."
            })
        }

        // step234: now if its neither denied nor a spoofed bot , we can call the next method here now below ; next method is like : we have placed this middleware before a function and only after security pass from this middleware , the next function will be called ; so that what is the next function being called below after all the checks done above.

        // step235: see the auth.route.js file for the next steps now there.
        next();
        
    } catch (error) {
        // step226: in the error we can log the following message here below.
        console.log("Arcjet Protection Error",error)

        // step227: and then since arcjet protection failed , we can't do anything but will have to move ahead by calling next function , to prevent app to crash completely here , so now below we call the next method , whatever is the next method written after this middleware wherever this method is called.
        next();
    }
}