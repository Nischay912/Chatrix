// step261: lets import the message model here below ; and also the user model to get the user details from the database.
import Message from '../models/Message.js'
import User from '../models/User.js'
import cloudinary from '../lib/cloudinary.js'

// step260: lets create the function to get all contacts first here below.
export const getAllContacts = async(req, res) => {
    try {
        // step262: lets try to get the loggedInUserId here below first.

        // step267: the below line will throw an error : because we have "user" as undefined object , as in message.route.js , we are calling the getAllContacts function , but "user" was not passed to it ; so ee the error correction in next step in message.route.js file now.
        const loggedInUserId = req.user._id;

        // step263: we don't want the loggedInUser to be shown in the contact list obviously ; so lets filter the users who are not the loggedInUser here below ; so we : Find all users whose _id is NOT equal to the logged-in user’s _id.

        // step264: we don't want password to be returned by the below code : so lets use select method to remove the password from the response below.
        const filteredUsers = await User.find({_id : { $ne : loggedInUserId }}).select("-password")

        // step265: now lets send the filteredUsers as repsonse bcak here below.
        res.status(200).json(filteredUsers)

    } catch (error) {
        // step266: any error if occurs , logged on console here below.
        console.log("Error getting all contacts", error);
        res.status(500).json({ message: "Error getting all contacts" });
    }
}

// step271: now lets define the next endpoint's function here below ; where we will try to find the messages between the logged in user and another user.
export const getMessagesbyUserId = async(req, res) => {
    try {
        // step272: lets get the logged in user id here below.
        const myId = req.user._id;

        // step273: now lets get the id of the user whom we want to see messages with us , suing the dynamic parameter stored in params from the url here below.

        // step274: we extract the "id" part from url and store it in "id" variable , but we here have renamed it to userToChatId here below.
        const {id:userToChatId} = req.params;

        // step275: now lets try to find all the messages between us here below.
        const message = await Message.find({

            // step276: so we try to find all the messages from the messages collection made using Message model ; where we try to find all the messages between us i.e. all the messages where i am the sender , and he is reciever & also all messages where he is the sender and i am the reciever.
            $or: [
                {senderId:myId, recieverId:userToChatId},
                {senderId:userToChatId, recieverId:myId}
            ]
        })  

        // step277: now lets send the messages as response here below.
        res.status(200).json(message)

    } catch (error) {
        // step278: any error if occurs , logged on console here below.
        console.log("Error getting messages", error);
        res.status(500).json({ message: "Error getting messages due to Internal Server Error" });
    }
}

// step279: now lets define the function for the next endpoint here below ; where we will try to send a message to another user.

// step280: but before that in the message.route.js file ; make the protectRoute method to run there before calling these functions ; so that user gets authenticated before seeing or sending the messages & then the protectRoute function also send th eauthenticated logged in user's details to the next(0 function called after that middle ware at that endpoint there ; thus that user details will come here as "user" object and can be used the function written here above as well as below here.
export const sendMessage = async(req, res) => {
    try {
        // step281: now lets get the text and the image from the request sent by user ; since this was a post request there.
        const {text, image} = req.body;

        // step282: then lets try to get the user whom we want to send the message from the url coming dynamically there ; and lets rename that to recieverId here below.
        const {id:recieverId} = req.params;

        // step283: now lets get the authenticated user's id dent by middleware protectRoute to its next() fucntion called there after it i.e. to this function , so we cna use it now here below.
        const senderId = req.user._id;

        // ADDED THE BELOW CHECK TO ENSURE THAT THE TEXT AND IMAGE IS NOT EMPTY AS THEN THERE IS NO POINT IN SENDING THE MESSAGE IF BOTH OF THEM ARE EMPTY ; ALSO ADD CHECKS FOR THAT WE CANNOT SEND MESSAGES TO OURSELVES ; AND ALSO CHECK IF RECIEVER IS FOUND OR NOT BASED ON THE ID ON WHICH REQUEST WAS MADE THERE.
        if(!text && !image){
            return res.status(400).json({ message: "Text or Image is required" });
        }

        if(senderId.equals(recieverId)){
            return res.status(400).json({ message: "You cannot send message to yourself" });
        }

        const recieverExists = await User.findById(recieverId);
        if(!recieverExists){
            return res.status(400).json({ message: "Reciever not found" });
        }

        // step284: now user can send either an image or text ; if its an image we'll save it to cloudinary first to save it on cloud and send it easily and safely later.

        // step285: so lets create a variable with "let" as we are going to use it multiple times here below.
        let imageUrl;

        // step286: now if user wants to send an image we will upload it to cloudinary using the below code and then get the secureUrl of it and assign it to imageUrl variable here below ; so below we check if the POST request contains an image or not ; if yes then do the following below.
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        // step287: now lets create a new message object or document in the messages collection using the Message model here below.
        const newMessage = await Message({
            senderId,
            recieverId,
            text,
            image:imageUrl
        });

        // step288: finally lets save the above created document to the database here below ; so the below code : Saves the new message document into MongoDB inside the messages collection.
        await newMessage.save();

        // step289: and then send the message as response here below ; with status code 201 which means something was created successfully.
        res.status(201).json(newMessage)

    } catch (error) {
        // step290: any error if occurs , logged on console here below.

        // step291: see the next steps in step292.txt file now there.
        console.log("Error sending message", error);
        res.status(500).json({ message: "Error sending message due to Internal Server Error" });
    }
}

// step294: now lets create the function for the next endpoint here below.

// step295: now we want to return only those users under the chat section , with whom we have initiated chats and not the other contacts users of the database ; like if we have 100 contacts , but we have messages with only 2 of them, then under th chat section we want to return only those 2 users.

// step296: so we will try to fetch those messages where we are either the sender or the reciver and from those messages we will be extracting the senderId when we recieved it from sender OR recieverId for whom we sent the message to.
export const getChatPartners = async(req, res) => {
    try {
        // step297: so lets get the loggedInUserId here below like we did in the getAllContacts function above.
        const loggedInUserId = req.user._id;

        // step298: now we need to find all the emssages where the loggedInUserId is either the sender or the reciever.
        const messages = await Message.find({
            $or: [
                {senderId:loggedInUserId},
                {recieverId:loggedInUserId}
            ]
        })

        // step299: now lets try to fetch the id of those with whom we had chat with.

        // step300: now we used .find() above which alwasy returns an array ; so it must have returned an array of messages where the loggedInUserId is either the sender or the reciever ; then now we run the map function below to iterate over each object in the array of objects named "messages" here below.

        // step301: then we have two options below ; we need to extract the other userId with whch we have done chat with anytime , as we have to display them under the CHAT section ; so when we are the reciever , the other user will be the senderId in the message & when we are the sender , the other user will be the recieverId in the message ; so we use ternary operator below to get the other user's id stored in the array named "chatPartnersIds" by checking in each message object that if that message involves the loggedIn user as sender , then the reciever will be the one to be displayed on chat screen & if the message has loggedIn user as reciever , then the sender will be the one to be displayed on chat screen ; that we achieve using the ternary operator below.

        // step302: we have used Set below which is a Javascript object that stores only unique values and no duplicates ; here we will not be showing the other user's 5 times in chat section if we have 5 messages with them ; we will show them once only , so thats why use Set to keep the other user's id only once for each of them in this "cahtPartnersIds" array below.

        // step303: we have used "..." the spread operator because the Set gives us a Set and not an array , so we use "..." to convert it back to array in each iteration , so that overall the chatPartnersIds will be an array of unique id's of all the users with whom we have had chat with ; So ... is used here to convert Set → Array ; also we know "..." spread operator in each iteration keeps the old values and appends new values at end , making the data-structure to be an array with all ids in it being appended one after the other.

        // step304: we had toString() as senderId and recieverId are MongoDB ObjectIds, not normal strings ; but comparing two ObjectIds directly doesn’t work correctly (=== will return false even if they look the same) ; so we use toString which : converts them into string format, so we can safely compare them ; so .toString() is used here to make IDs comparable.
        const chatPartnersIds = [...new Set
            (messages.map(msg =>
                msg.senderId.toString() === loggedInUserId.toString()
                ? msg.recieverId.toString() 
                : msg.senderId.toString()
            )
        )];

        // step305: now lets fetch these other users details from the database here below ; if they have their id present inside the "chatPartnersIds" array of unique id's of all the users with whom we have had chat with.

        // setp306: we did not want to return the password in the response , so we use select method to remove the password from the response below.
        const chatPartners = await User.find({ _id: { $in: chatPartnersIds } }).select("-password");

        // step307: now lets send the chatPartners as repsonse back here below.
        res.status(200).json(chatPartners)
        
    } catch (error) {
        // step308: any error if occurs , logged on console here below.
        console.log("Error getting chat partners", error);
        res.status(500).json({ message: "Error getting chat partners due to Internal Server Error" });
    }
    // step309: see the next steps in step310.txt file now there.
}