// step34: setup this now same as we did the auth.route.js now here below.
import express from 'express'
import { getAllContacts  , getMessagesbyUserId , sendMessage , getChatPartners } from '../controllers/message.controller.js'
import { protectRoute } from '../middleware/auth.middleware.js'
import { arcjetProtection } from '../middleware/arcjet.middleware.js'

const router = express.Router()

// step311: lets now try to first run the arcjet protection method to ensure its not spamming being done there , after that we call its next() function i.e. the protectRoute function now here below and finally after that : so that the protectRoute will run before all of the endpoints and pass the authorized logged in user details in the next() function i.e. to all the 4 methods written below it there.

// step312: so the below middlewares will execute in order - so requests get rate-limited, then authenticated ; this is actually more efficient since unauthenticated requests get blocked by rate limiting before hitting the authentication/auth middleware here below.

// step313: see the next steps in step314.txt file now there.

router.use(arcjetProtection , protectRoute)

// step254: now lets create a endpoint for contacts to get all the users of the database there ; which runs the function getAllContacts on going to this endpoint now here below.

// step268: lets run the protectRoute function before running the getAllContacts function , as we had seen in this protectRoute function that : in the protectRoute middleware it was sending the logged-in user's details to the next() function written after it ; so below it will first authenticate the logged-in user and the pass the user's details in "user" object to the next function written after it here below.

// step269: see the next steps in step270.txt file now there.
// router.get("/contacts", protectRoute, getAllContacts)
router.get("/contacts", getAllContacts)

// step255: also create an endpoint now to get all the chats we have donw with those there now here below ; which runs the function getChatPartners on going to this endpoint now here below.
// router.get("/chats", protectRoute, getChatPartners)
router.get("/chats", getChatPartners)

// step256: now lets also create an endpoint to get all the messages between us and the user based on its userId here below.

// step257: we have put : in the endpoint so that it will take the id of user from the URL dynamically based on which user's messages we want to load there on the screen.
// router.get("/:id" , protectRoute ,getMessagesbyUserId)
router.get("/:id" ,getMessagesbyUserId)

// step258: now lets create a POST request to send message to a specific user based on its userId taken dynamically from the URL now here below ; so the endpoint will be like : /api/messages/send/:id , example : /api/messages/send/123456 : this will send the message to the user with id 123456.
// router.post("/send/:id" , protectRoute, sendMessage)
router.post("/send/:id" , sendMessage)

// step259: see the next steps in message.controller.js file there now.

// step35: lets create some endpoints below to test for now.

// step36: so now since we had "/api/messages" in the server.js file , now all the endpoints created here below will be having "/api/messages" as their base path ; so the full endpoint will be "/api/messages/send" now and so on : which we can see the response by going on "http://localhost:3000/api/messages/send" in the browser there as the GET request is sent from the frontend to this endpoint there ; so when user goes on "localhost:3000/api/messages/send" , they actually send a GET request to this endpoint there and then they will get the response back from the server there.
// router.get("/send", (req, res) => {
//     res.send("Send message endpoint")
// })

export default router