// step24: lets import express and create a router below.
import express from 'express'
import { signup , login , logout } from '../controllers/auth.controller.js'
const router = express.Router()

// step26: now lets use the endpoints here below, and here we have "router" not "app" so adjust adn paste them here below.

// step27: see next steps in server.js file there.

// step58: now we can have multiple lines of code in each of below get requests functions , so lets put the content inside in a new folder's file named "controllers" file "auth.controller.js" file.

// step59: see next steps there in that file now.

// router.get("/signup", (req, res) => {
//     res.send("signup endpoint")
// })

// step62: so we now instead of the whole content of function above we can just call the function here below from that auth.controller.js file now below.

// step63: make it post request now because during signup user will send data to server like username password and all ; so don't use get as we don't have to request data from server , but send data to the server instead here below.

// step64: see next steps in server.js file now there.
router.post("/signup" , signup)

// step148: now like done for signup above , lets also do for login and logout below ; so see next steps again now in auth.controller.js file there.

router.post("/login", login)
router.post("/logout", logout)

// router.get("/login", (req, res) => {
//     res.send("login endpoint")
// })
// router.get("/logout", (req, res) => {
//     res.send("logout endpoint")
// })

// step25: since import hs been used , at the end use the export keyword to export the router below.
export default router