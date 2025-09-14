// step3: lets build a basic API to test here below.

// step7: now we can run this by making in the "package.json" under script as : "dev" : "node server.js" to run this server now by typing in terminal : "npm run dev"

// step8: but we see that everytime there is changes made in the server.js file , we need to do ctrl+c to stop the server and then run again to see the changes ; so to prevent this we can either put "node --watch server.js" there in package.json file or if not works : we can install a package by : npm i nodemon -D > and then in package.json under script make it to "nodemon server.js" and then run "npm run dev" in the temrinal now to see the changes visible as soon as changes are made in the terminal there.

// step4: we first include the express package in the server.js file as below.
// const express = require('express')

// step9: we can use the import statement instead of the require statement too , but for that we need to add "type" : "module" in the package.json file , so there under "keywords" : [] , type : "type" : "module" which is commonjs by default but now set to module as now we are using the import statement instead of the require statement.
import express from 'express'

// step39: path is already built in nodeJs , so we can import it directly now without installing it in terminal.
import path from 'path'

// step28: lets import the auth route file now to be able to use its endpoints below in this file here.
import authRoutes from './routes/auth.route.js'

// step33: lets import this now same as we did for auth above , and now see next steps in message.route.js file there.
import messageRoutes from './routes/message.route.js'

// import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
// step18: lets load the ".env" file now by calling the method of dotenv package below.
// dotenv.config()
import { ENV } from './lib/env.js'

import cookieParser from 'cookie-parser'

// step5: then we create an instance of express below.
const app = express()

// step38: we first write this below ; path.resolve() returns the absolute path of the current working directory
const __dirname = path.resolve()

// step16: now lets see if the PORT is being accessed or not from the ".env" file.

// step17: showing undefined error because we are accessing it from the ".env" file, so we need to load the ".env" file first.
// console.log(process.env.PORT)

// step19: now lets save the port value from env file in PORT variable and if its not defined lets set it to 3000 by default.
const PORT = ENV.PORT || 3000

// step65: now lets use the express middleware to help get access of the fields inputs that user sends during signup and login to the server there.

// step66: so the data entered by user will be sent to server her under req.body and so express middleware will help us to get access of the data entered by the user there.

// step67: see next steps in auth.controller.js file now there.
app.use(express.json())

// step179: let suse the cookie-parser package to help us get access of the cookies sent by the user there ; so we parse the cookie into a JSON object using this package.

// step180: see the next steps back in middleware.js file there.
app.use(cookieParser())

// step10: now lets tets the server for various endpoints of url below and then go on "http://localhost:3000/api/auth/login" to see the response sent by the server for the login endpoint there.

// step13: we see in frontend , everything related to application code is under "src" folder , so here in backend also make a src folder for best practice and shift the server.js file there and weill keep all the folders of backend under this folder only & so now we will have to update package.json file under script to : "nodemon src/server.js".

// step14 : and there under script also make a script for production as : "start" : "node src/server.js" > because in production we need not listen and watch for the changes as once its deployed , code is not going to change ; but changes only when developing so had npm run dev with nodemon for development while normal nodeJs command for production after deployment.

// step22: now these all endpoints will be having many lines of code later , so we don't want to have all of them in a single file so lets create a "routes" folder inside src and since these are for authentication , lets make "auth.js" file in "routes" folder ; but we can instead also rather create file named "auth.route.js" as by convention it will then mean that its a route file related to authentication.

// step23: so see the next steps in that file now there.

// step29: now instead of codes below that we have shifted to auth.rout.js file , we can use them now below.

// step30: so now we remove "/api/auth" from the get functions in auth.route.js file as we are using it below for any request made and add the corresponding "/login" or "/logout" or "/signup" endpoints below.

// step31: so this sets a base path for all routes inside authRoutes ; so if auth.route.js file has .get("/login,....") , the full endpoint becomes /api/auth/login ; this makes the code cleaner now.
app.use("/api/auth", authRoutes)

// step32: now codebase has become very cleaner and now in the future we if want to create something related to messages , we cand o the same as above now below for it.
app.use("/api/messages", messageRoutes)

// step40: after all the API endpoints , we make it ready for deployment using the below codes -

// step41: now we ensure following code runs only in production mode ; we tell express to serve static files like html , css , js using the ".static" middleware below ; then path.join : builds the absolute path to the folder containing your frontend build , containing directory name first and then the frontend's dist folder.

// step42: we have places all in app.use so that : it adds this middleware to the whole app, so when someone visits your website, Express automatically serves the frontend files.
if(ENV.NODE_ENV === "production") {

    // step43: we have used ".." as we currently will be in backend folder as this server.js runs there ; so first "." moves us one out of backend in the main Chatrix folder and then using "./" we went in the frontend in the outermost place in the Chatrix folder here and then the "dist" folder.
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    // step44: now if user makes request for any endpoint that hasn't been handled yet , then this below "*" catches it and sends the main frontend file which was index.html in the dist folder there ; so like if user makes request for /about page , and it hasn't been handled yet then it must be there in the index.html main file in dist of react app , so instead of sending nothing we send that file below, so that React sees the /about url and render the /about page.
    // app.get("*", (req, res) => {

    // CAN PUT "_" IF REQ WAS NOT NEEDED , BY CONVENTION.
    app.get("*", (_, res) => {

        // can do in any of the below ways.

        // res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

// WE ARE SENDING GET REQUESTS FROM THE BROWSER TO THESE URLS BELOW.
// app.get("/api/auth/signup", (req, res) => {
//     res.send("signup endpoint")
// })

// // step11: made for login endpoint
// app.get("/api/auth/login", (req, res) => {
//     res.send("login endpoint")
// })
// // step12: made for logout endpoint
// app.get("/api/auth/logout", (req, res) => {
//     res.send("logout endpoint")
// })


// step6: then console log to see if the server is running or not.

// step15: lets not hardcode the PORT but save it in ".env" file ; not under src but just inside backend folder and save PORT there , so that we can use it in the server.js file without hardcoding it there and also hosting service might assign a port automatically (via process.env.PORT) ; so better to access it from the .env file there.

// app.listen(3000, () => console.log("Server is running on port 3000"))

// step20: now lets use the PORT variable instead of hardcoded PORT value above.

// step54: now lets call the function we created once we start listening our application.

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);

    // step55: calling the fucntion created in "lib" folder there , thats imported and being used now here below.

    // step56: can check it by doing "cd backend" > npm run dev and see the logs in server terminal saying the app is running with mongoDB connected successfully there.

    // step57: now see the next steps in auth.route.js file there.
    connectDB()
})

// step21: now in .env file we make NODE_ENV = development as we are currently in development and when deploying we will change it to production.