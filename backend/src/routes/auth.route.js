// step24: lets import express and create a router below.
import express from 'express'
import { signup , login , logout , updateProfile } from '../controllers/auth.controller.js'

// step193: lets import the protectRoute function here below.
import { protectRoute } from '../middleware/auth.middleware.js'
import { arcjetProtection } from '../middleware/arcjet.middleware.js'

// step194: see th enext steps in the step195.txt file now there.

const router = express.Router()

// step242: lets write the arcjetProtection middleware here below itself , so that automatically if this protection succeeds then it will call the login , logut , etc all functions below as they are now its next functions ; so now can remove arcjet protection from each routes there as below code will check for each of them now automatically.

// step243: see next steps in step244.txt file now there.
router.use(arcjetProtection)

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

// router.post("/login", login)

// step236: just before the login , lets put the middleware for arcjet checking and then after check of it only , we pass the contorl to run the next function i.e. login function here below.

// step237: can also do on signup above too.

// COMMENTED DUE TO STEP 242 TOLD ABOVE : CAN SEE THERE.
// router.post("/login", arcjetProtection, login)
router.post("/login",  login)

// step238: but if we send a request for login now even once from postman : it will be treated as a BOT request and thus it will be blocked by arcjet and we will show an error response there ; so to test this lets create a get request below just for testing which we will use temporarily for testing here below.

// step239: to test this for now only : go to arcjet.js file and set the max to 5 per minute : then go on the "localhost:3000/api/auth/test" endpoint and try to send a GET request continuously there by pressing the refresh button continuously there : if we do so : after 5 times we will see the error : hence our arcjet is working correctly.

// step240: comment this below out after testing : as it was for testing purpose only there.

// step241: now lets do the arcjet protection on logout and updateProfile as well there and at many places ; but adding them manually in each of them is very time-consuming so instead what we can do is in the next step above there.

router.get("/test", arcjetProtection, (req, res) => {
    res.status(200).json({ message: "Test route successful" })
})

router.post("/logout", logout)

// router.get("/login", (req, res) => {
//     res.send("login endpoint")
// })
// router.get("/logout", (req, res) => {
//     res.send("logout endpoint")
// })

// step166: now lets create an endpoint for updating the profile here below , same as we did for signup and login above.

// step167: since its related to updation , so we make it as PUT request here below.

// step168: see the next steps in the auth.controller.js file now there.

// step171: for updating a profile , the user must be authenticated ; so we will be calling one more function below to check for user if is authenticated , only then they can call and run for the user , this update profile function here below ; if they are not authenticated , the protectRoute function running before will throw some errors and we won't be able to call the updateProfile function for that user thus there.

// step172: see the next steps in step173.txt file now there.
router.put("/update-profile" , protectRoute , updateProfile)

// step211: now we need to have one more checking her elike if we are on messaging page of our app, and we press refresh there , then the server should in the backround check if user is authenticated or not ; if yes redirect him to chat page ; else redirect him back to the oath page for signup and all back there again.

// step212: its just a checking happening , so we can keep it a GET request ; so when we go on /api/auth/check endpoint , the protectRoute middleware will run before sending a response back to the user ; so if user is authenticated , the protectRoute middleware will run and then send the data of user into req.user & like seen in middleware.js , it sets req.user=user and calls next() ; here next function after the middleware mentioned below is the res.status call function ; so the middleware passes the user's dsta as req.user after checking if its authenticated or not there.

// step213: can check this on POSTMAN by making call to login first to login the user and then call at /check to see success ; but after calling to /logout , after that if call to /check ; then it will show error as : the user has been logged out ; not logged in.

// step214: see the next steps in step215.txt file now there.
router.get("/check", protectRoute, (req,res) =>{
    res.status(200).json(req.user)
})

// step25: since import hs been used , at the end use the export keyword to export the router below.
export default router