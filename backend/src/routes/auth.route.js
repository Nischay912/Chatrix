// step24: lets import express and create a router below.
import express from 'express'
const router = express.Router()

// step26: now lets use the endpoints here below, and here we have "router" not "app" so adjust adn paste them here below.

// step27: see next steps in server.js file there.
router.get("/signup", (req, res) => {
    res.send("signup endpoint")
})

router.get("/login", (req, res) => {
    res.send("login endpoint")
})
router.get("/logout", (req, res) => {
    res.send("logout endpoint")
})

// step25: since import hs been used , at the end use the export keyword to export the router below.
export default router