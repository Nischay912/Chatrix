// step34: setup this now same as we did the auth.route.js now here below.
import express from 'express'
const router = express.Router()

// step35: lets create some endpoints below to test for now.

// step36: so now since we had "/api/messages" in the server.js file , now all the endpoints created here below will be having "/api/messages" as their base path ; so the full endpoint will be "/api/messages/send" now and so on : which we can see the response by going on "http://localhost:3000/api/messages/send" in the browser there as the GET request is sent from the frontend to this endpoint there ; so when user goes on "localhost:3000/api/messages/send" , they actually send a GET request to this endpoint there and then they will get the response back from the server there.
router.get("/send", (req, res) => {
    res.send("Send message endpoint")
})

export default router