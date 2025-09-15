// step245: now every message in the database will have many different fields like who is the sender , who is the reciever , message has a text or an image , etc.

// step246: so lets define the schema for the messages model here below ; so the collection name will be "messages" in the database and it will be having the following schema for each document in the collection.
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {

        // step247: so every message will have a sender id and a reciever id which is mandatory to be there.
        senderId : {
            type: mongoose.Schema.Types.ObjectId,

            // step248: this ref is used to tell mongoose that the "senderId" field is a reference to the "User" model in the database ; so this "senderId" field will be a foreign key pointing to the "User" model in the database.

            // step249: so this statement below states that the senderId will be coming from the "User" model in the database and same for recieverId as well ; because the sender and reciever must be the users of the platform's database.
            ref: "User",
            required: true
        },
        recieverId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // step250: now each message can be a text or an image , so lets add a text and an image field here below l and even the image can be sent with some caption , so we can have both tect and image in a message at the same time as well.
        text : {
            type: String,
            trim: true, // this automatically removes leading and trailing spaces from the string
            maxLength: 2000, //this limits the string length to 2000 characters max ; if someone tries to send a longer message, Mongoose will throw a validation error.
        },
        image : {
            type: String,
        },
    },

    // step251: can add the below line at the end to have the createdAt and updatedAt timestamps in the database too along with the other fields of the message.
    { timestamps: true }
);

// step252: finally create the model and export it to be used via import in other files now there.
const Message = mongoose.model("Message", messageSchema);

export default Message;

// step253: see the next steps in message.route.js file now there.