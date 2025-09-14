// step60: lets writee the function inside export as it will be used in auth.route.js file now by importing it there.

import User from "../models/User.js"
import bcryptjs from "bcryptjs"
import { generateToken } from "../lib/utils.js"
import { sendWelcomeEmail } from "../emails/emailHandlers.js"

// step144: to use the environment variables , we again need to import dotenv package and call its .config method first here below.
// import dotenv from "dotenv"
// dotenv.config()
import { ENV } from "../lib/env.js"

// step61: we copied the content of function here now ; see next steps in auth.route.js file now.
export const signup = async (req, res) => {
    // res.send("signup endpoint")

    // step68: lets now accept the data sent by user to the server here below.

    // step69: to use the below line , we needed to do app.use(express.json()) in server.js file that we did earlier there ; because using express.json reads the incoming JSON , parses it and puts the resulting object in req.body object , from which we are accessing data like fullName, email, password here below ; without that express.json line , this req.body will be undefined ; and then we are saving the values in the variables mentioned below.
    const { fullName,email, password } = req.body

    // step70: now lets do check for various things in all the fields before proceeding to submitting the data to the database.
    try {

        // step71: put the following checks below to be checked first there.
        if(!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        if(password.length < 8) {
            return res.status(400).json({ message: "Password should be at least 8 characters" })
        }

        // step72: checking if email is valid or not using regular expressions below ; this regular expression checks if email is valid or not.
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(email)) {
            return res.status(400).json({ message: "Please enter a valid email" })
        }

        // step73: now lets check if user already exists or not with same email already ; so for that lets first create a model folder in src folder and see the next steps there now first.

        // step82: lets now use the model we made to interact with the collection "users" of the database.
        const user = await User.findOne({ email })

        // step83: so the above code will return the user with the email entered by the user and now we will check if user with that email already exists in the database.
        if(user) {
            return res.status(400).json({ message: "User already exists" })
        }

        // step84: but if email is unique , its a new user , so in that case we hash the password of the user as we don't want to store the actual password in the database as it may be leaked if attacker hacks the database.

        // step85: so we will hash the password of the user here below using bcryptjs.

        // step86: A salt is a random string added to the password before hashing ; example : password = "123456" , Salt = "XyZ@7!" , then : hashed input = "123456XyZ@7!"

        // step87: even if 2 users have same password , due to salt their hashed value will be very difficult to crack up , if salt not used hashed value will be same too ; so this is called salted hashing ; and we will use 10 salt rounds for hashing password ; because 10 salt rounds will take 10 seconds to hash the password ; 10 is the “cost factor” → higher number = more secure but slower hashing.
        const salt = await bcryptjs.genSalt(10)

        // step88: Takes your password + salt and generates a hashed password ; this is what we will be storing in the database.
        const hashedPassword = await bcryptjs.hash(password, salt)

        // step89: now lets store the user signed in using the model we created above.
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword
        })

        // step90: now lets try to authenticate the user below using the code below.
        if(newUser){
            // step92: if user created successfully , we generate a token to authenticate the user.

            
            // step93: we know that in mongoDB : MongoDB automatically gives every document a unique _id & now we pass this ID into generateToken() function below.
            // generateToken(newUser._id , res)
            
            // GOT SUGGESTION FROM CODE-RABBIT WHICH GIVES IS SUGGESTIONS ON GITHUB BEFORE MERGING A PULL REQUEST : so we first save the user below and then call the function ; so lets write these two lines in code and comment the one we had earlier below it.
            const savedUser = await newUser.save()
            generateToken(savedUser._id , res)

            // step94: then use the save function to save the user in the database.
            await newUser.save()

            // step95: then send success message to the user ; 200 status code means Success and 201 status code means Something was successfully created.
            res.status(201).json({ 

                // step96: then we send this below in response to the client once signup is successful.
                message: "User created successfully",
                _id : newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            });

            // step143: lets now call the function to send welcome email to user when he/she signs up.

            // step145: see the next steps in step146.txt file now there.
            try{
                await sendWelcomeEmail(savedUser.email,savedUser.fullName,ENV.CLIENT_URL)
            }
            catch(error){
                console.log("Error sending welcome email" , error);
            }
        }
        else{
            // step91: if user not created due to some errors while entering the data , send error message.
            return res.status(400).json({ message: "Something went wrong" })
        }

    } catch (error) {

        // step97: if any error occurs , send error message.
        console.log("Error in signup", error)

        // step98: can send error message to the user with 501 status code which means not implemented successfully.

        // step99: see the next steps in "util.js" file in the "lib" folder now there.
        res.status(500).json({ message: "Something went wrong due to some Internal Server Error" })
        
    }
}

// step149: now lets paste the function we had in route.js here below and we'll edit it here only now below.
export const login = async (req, res) => {
    // res.send("login endpoint")

    // CAN ADD THIS CHECK BELOW IN START ITSELF TO ENSURE THAT BOTH EMAIL AND PASSWORD WERE FILLED AND NOT SENT NULL OR EMPTY FIELDS.
    if(!email || !password){
        return res.status(400).json({ message: "Email and Password are required" })
    }

    // step150: now user will be sending email and password in login page , so lets accept those values here below.
    const { email , password } = req.body

    // step151: now lets check if user exists or not
    try{
        // step152: find the user by email
        const user = await User.findOne({ email })

        // step153: if user not exists , give it response that Credentials are invalid , instead of saying email is incorrect or passwords , as hacker may then try to crack whats wrong out of mail or password easily then there.
        if(!user){
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        // step154: now lets check if password is correct or not ; so we use the bcryptjs.compare method here below to compare the password user typed in field and sent above , with the password in the database corresponding to the entered email.
        const isPasswordCorrect = await bcryptjs.compare(password , user.password)

        // step155: if password not correct , give it response that Credentials are invalid
        if(!isPasswordCorrect){
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        // step156: if none of above return returned the user out of the function , means the user is authenticated , so we generate a token for the user and send it back to the client ; becasue like elarnt earlier , token is stored in the browser for next time request is made , so we can show some success message there like : Logged In Successfully & so the server knows who the user is every time and keeps him logged in without making him to enter credentials every time ; instead its information is saved in the browser that the user is logged in succesffully throughout , so till cookie is removed , user remians logged in.
        generateToken(user._id , res)

        // step157: then we can send a response to the client once login is successful.
        res.status(200).json({
            message: "User logged in successfully",
            _id : user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });
    }

    // step158: if any error occurs , send error message.
    catch(error){
        console.error("Error in login", error)
        res.status(500).json({ message: "Something went wrong due to some Internal Server Error" })
    }
}

// step159: now for the logout user , won't be entering any data and sending as req.body ; so we can omit the req paramneter below or put "_" there as convention says so to do.
export const logout = async (_, res) => {
    // res.send("logout endpoint")

    // step160: here we will try to get rid of the cookies here below upon logout ; because in the utils.js file we when called the generate token function upon login , we set a cookie with name "jwt" there , so same name give below to get rid of that cookie and logout the user.

    // step161: so below , we make the new value to be nothing below "" and then kill the cookie immediately below.
    res.cookie("jwt" , "" , {

        // step162: the below command deletes the cookie immediately and logs out the user ; as currently in browser , one user will be logged in whose cookie is there and so once we kill the cookie , the user will be logged out immediately.
        maxAge:0
    })

    // step163: then we can send a response to the client once logout is successful.
    res.status(200).json({ message: "User logged out successfully" });

    // step164: see the next steps in step165.txt file now there.
}