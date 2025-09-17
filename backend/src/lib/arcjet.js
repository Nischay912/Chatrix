import arcjet, { shield, detectBot, slidingWindow } from "@arcjet/node";
import { ENV } from "./env.js";

// step218: lets copy the code from documentation and paste it here below.
const aj = arcjet({

    // step219: replace process.env with ENV as seen earlier we are using them from env.js file now there.
  key: ENV.ARCJET_KEY,
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE", // LIVE blocks requests. Use "DRY_RUN" to log them only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    // tokenBucket({
    //   mode: "LIVE",
    //   // Tracked by IP address by default, but this can be customized
    //   // See https://docs.arcjet.com/fingerprints
    //   //characteristics: ["ip.src"],
    //   refillRate: 5, // Refill 5 tokens per interval
    //   interval: 10, // Refill every 10 seconds
    //   capacity: 10, // Bucket capacity of 10 tokens
    // }),

    // step220: using slidingWindow instead of tokenBucket here now as the Rate Liminting Algorithm based on time now.
    slidingWindow({
      mode: "LIVE",
      max:100, // 100 requests per minute
      interval: 60, // 60 seconds i.e. 1 minute : so allowing 100 request per minute
    }),
  ],
});

// step221: finally export this function so that it can be used in other files now there by importing this file there.
export default aj;

// step222: see next steps in the arcjet.middleware.js file there now.