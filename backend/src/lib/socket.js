// step704: we will first import some things to be used here.

// step705: get the socket server first here below ; and then import http ; no need to install it as its in-built in the node package we installed way earlier.
import { Server } from "socket.io";
import http from "http";

// step706: then also import express and our environment variables.
import express from "express";
import { ENV } from "./env.js";

import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";

// step707: lets create the express server first here below.
const app = express();

// step708: lets create our server by passing the express app into it here below.
const server = http.createServer(app);

// step709: lets now create the socket server here below ; and we have convention to call it "io" so lets name it that only here below.

// step710: so by the below line : you’re telling Socket.IO: Please attach yourself to this HTTP server so you can handle WebSocket connections alongside normal HTTP requests ; Your HTTP server (server) continues to handle regular browser requests (like /login, /about, /api/...) ; On the same port, Socket.IO can now upgrade certain requests to WebSockets for real-time communication.

// step711: so what we saw in 703.txt is implemented here i.e. on top of the express server , we introduce the socket server here below.
// const io = new Server(server)

// step712: now lets configure the above line by passing an object to it here below.

// step713: just like we had in server.js too ; here alsow e write this object in it below so that : it will configures it so only your frontend (ENV.CLIENT_URL) can connect, while also allowing cookies/credentials to be shared during the connection.
const io = new Server(server, {
    cors: {
        origin: [ENV.CLIENT_URL],
        credentials: true
    },
})

// step714: now lets apply authentication middleware to all socket connections here below.

// step715: see the next steps in "socket.auth.middleware.js" file now there.
io.use(socketAuthMiddleware);

// step777: now lets create a function to check if a user is online or not here below ; we had userSocketMap which contained all the online users in the format : {userId: socketId} ; so we are accessing the socketId of the user whom we want to send message to in real-time using socket server ; so if reciever is online , her can instantly receive the message by below code , if he is offline no need to worry as later when he comes onine , page will have been refreshed so anyways he will receive the message by the time he comes online.

// step778: see the next steps in messageController.js file now there.
export function getRecieverSocketId(userId){
    return userSocketMap[userId];
}

// step728: we have to store the online users too ; so lets create an object which will store all the online users in the format : {userId: socketId}

// step729: see the next steps in messageController.js file now there.
const userSocketMap = {};

// step729: when a user connects to this socket server , we can listen to it using the below code ; and then call the callback method below too.

// step730: and like seen earlier , the user gets stored in "socket" , so lets use it only here below in the callback function here below.
io.on("connection" , (socket) =>{

    // step731: since we had used the middleware , thats why it made the "user" to get the authenticated user's data in it ; thats why after calling the middleware , now we are able to access it here below using the "socket" now.
    console.log("A user connected " , socket.user.fullName);

    // step732: now when a user connects we will update the onlineUser list too ; so first get the online user from "socket" here below & then add it to the online user list too here below.
    const userId = socket.userId;
    userSocketMap[userId] = socket.id; //so we put the key:value pair in the socket map containing all the online users here ; with the key as user id and value as socket id of that user.

    // step733: now when a user comes online , we will need to tell all other users too , that he has come online , so for that we have a method which we will use below.

    // step734: so the io.emit() is used to send the event passed in it to all the connected users ; so the event name we have used here is "getOnlineUsers" ; so when a user comes online , we will emit this event to all the connected users here below ; and we will send the updated list with this event to all the users os they can see the update online user list there too.

    // step735: so we pass the keys which are the userId of all the online users with the event to all the connected users here below.
    io.emit("getOnlineUsers" , Object.keys(userSocketMap))

    // step736: now we can also listen to the "disconnect" event here below ; so when a user disconnects from the socket server , we can emit the event to all the connected users here below.
    socket.on("disconnect", () =>{
        console.log("A user disconnected" , socket.user.fullName);
        // step737: also when a user disconnects we can delete the userId from the online user list too here below.
        delete userSocketMap[userId];

        // step738: and then again call io.emit() to inform the clients that a user has disconnected now ; so he will get the updated list where it will show that someone just got disconnected thus here below.
        io.emit("getOnlineUsers" , Object.keys(userSocketMap))
    })
})

// step739: finally export all these things here below.

// step740: see the next steps in server.js file now there.
export {io , app , server};

