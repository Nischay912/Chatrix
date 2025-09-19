// step465: lets import the create function from the zustand package to start creating the zustand store here below.
import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"
import { useAuthStore } from "./useAuthStore"

// step466: then lets create the store that can be imported in any of the components in the app now there.
export const useChatStore = create((set , get) => ({
    // step467: so we will be returning this object here below.

    // step468: lets now create the states and function in this zustand store now.

    // step469: lets have an array state for all the contacts , then for the chat partners one array state ; then for messages too ; and they will all be empty initially , and once we fetch them , they all will be updated here below.
    allContacts: [],
    chats: [],
    messages: [],

    // step470: now initially whenevr you refresh the page we want the active tab to be chats and not contacts.
    activeTab: "chats",

    // step471: then the selected user will be null initially.
    selectedUser: null,

    // step472: also now we will be having a loading state to check if we are currently loading and fetching the data or not ; initially it will be false ; same for messages too.
    isUsersLoading: false,
    isMessagesLoading: false,

    // step473: now we will also have a state for whether the sound is enabled or not ; we will get its value from localStorage , so that : even if user refreshes the page , his choice is still locked on.

    // step474: so if the localStorage has a value of "true" , means the condition written below is true ,so then we will set this state to true too ; else to false.

    // We must parse to JSON as by default its string but we are doing its === to a boolean value so string can't be comapred to boolean thats why we have to parse it here below.
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

    // step475: now lets make some functions here too below.

    // step476: so we will have a toggleSound function to toggle the sound on and off.
    toggleSound: () => {

        // step477: "get" is used to get the latest value of a state ; so here below as soon as toggle method is called ; we update the local storage to the opposite of current sound value & also update the state value to that too using "set" in the next line there below.
        localStorage.setItem("isSoundEnabled" , !get().isSoundEnabled)
        set({isSoundEnabled: !get().isSoundEnabled})
    },

    // step478: now in the setActiveTab method user will send either chats or contacts tab as input parameter which will be used to update the activeTab state.
    setActiveTab: (tab) => {
        set({activeTab: tab})
    },

    // step479: similarly , the user will send the selectedUser from the contacts to update the selectedUser state here below.
    setSelectedUser: (selectedUser) => {
        // set({selectedUser: selectedUser})

        // step480: can write only once below , as the key value pair is same as the state name here below.
        set({selectedUser})
    },

    // step481: now we will have a function to get all the contacts as well as a function to get all the chat partners with whom we are having conversations with , from the database and update the allContacts state here below.
    getAllContacts: async() =>{
        // step482: we can use the code used in login of useAuthAtore.js file , as this also has similar use-case to be done here below.

        // step483: so we copied the "login" function code from useAuthStore.js and modified it a bit to get all the contacts here below.
        set({isUsersLoading: true});
        try{
            const res = await axiosInstance.get("/messages/contacts");
            set({allContacts: res.data});
        }
        catch(error){
            toast.error(error.response.data.message);
        }
        finally{
            set({isUsersLoading: false});
        }

    },
    getChatPartners: async() =>{
        // step484: same as above function , we do the same here below to get the chat partners from the respective /chats endpoint now here below.

        // step485: see the next steps in the ChatPage.jsx file now there.
        set({isUsersLoading: true});
        try{
            const res = await axiosInstance.get("/messages/chats");
            set({chats: res.data});
        }
        catch(error){
            toast.error(error.response.data.message);
        }
        finally{
            set({isUsersLoading: false});
        }
    },

    // step583: now lets make the function to get the messages in the right section of chat page , based on the clicked user there.
    getMessagesByUserId: async(userId) =>{
        // step584: first lets show the loading state here below as we are getting the messages now.
        set({isMessagesLoading: true});
        try {
            // step586: lets make a get request to the endpoint to get the messages now here below.
            const res = await axiosInstance.get(`/messages/${userId}`);
            // step587: now we will set the messages array to whatever we get from the response here below i.e. all the messages between the logged in user and the clicked user in the database.
            set({messages: res.data});
        } catch (error) {
            // step588: we can do error toast to be shwon here below , using optional chaining "?." syntax as its better than normal "." syntax because : if the error.response is undefined , then we will not get an error in the console ; so ?. ensures that if the error.response is undefined , then we will not get an error in the console.

            // step589: using conditional rendering here below to show the error toast if the error response is not undefined , otherwise we will show the default error message here below.

            // step590: see the next steps in the ChatContainer.jsx file now there.
            toast.error(error?.response?.data?.message || "Something went wrong");
        }
        finally{
            // step585: now lets hide the loading state here below as we have got the messages now.
            set({isMessagesLoading: false});
        }
    },

    // step650: lets create the sendMessage function here below ; using the messageData containing text and image to be sent to the user here below.
    sendMessage: async(messageData) =>{

        // step652: now lets get access of the selectedUser using the get() method here below  so the selectedUser state would have been updated with the details of the user we clicked or selected ; so in that statw we would be having the details of the user to whom we want to send the message ; so we use get method to get the current value of the state here below.

        // step655: we also thus here get the current messages array with all the current messages first here below.
        const {selectedUser , messages} = get();

        // step686: lets first try to get the authenticated user state from the another zustand store we had ; using getState function.

        // step687: so "getState" is used to get a state from one zustand store into another zustand store here below.
        const {authUser} = useAuthStore.getState();

        // step688: now lets try to get a temporary id here below ; which will generate a random id for the dummy message that we are sending here below.
        const tempId = `temp-${Date.now()}`

        // step689: now lets create the fake message object here below , with all the fields that were there in the original messages of database too ; but now we want to show the UI of the sent message before , without waiting for server to send a response ; we are just creating the message here below ; before the try-catch block where the request to server is being sent.
        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            recieverId: selectedUser._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(), // new Date() is an object, not a string. If you try to save it to a database, JSON, or send it via API, it will be converted in inconsistent ways ;.toISOString() ensures it’s always stored in a consistent, universal format.
            
            isOptimistic: true, //flag to identify optimistic message (optional)
        }

        // step690: so we don’t wait for server ; Instead, we immediately push a fake message (optimisticMessage) into the messages array ; here below ; where "..." spread operator first spreads the existing messages array and then adds the optimisticMessage to it ; and thus updates the messages array with new message added to it at end too here below.

        // step691: so after the request has been made : You call the /messages/send/:id API with the real message data in the try-catch block below this ; so here : you update the frontend immediately as if the action succeeded, without waiting for the server response ;so as soon as send is clicked ; the message will be seen in the UI there ; and then server will respond with success or error in try-catch block there.
        set({messages: [...messages, optimisticMessage]})

        try {
            // step651: now here we will be sending the messageData using POST request to the endpoint where we sent the message ; so remember we created an endpoint "/messages/send/:id" so we will be having the "id" of the user whom we want to send the message to here below.

            // step653: after that we access the _id from that object here below.

            // step685: currently once we get a message , we are awaiting till we get a reponse and then we are updating the UI using "set" below ; but now we want to update the UI as soon as the message is sent i.e. even before the backend is updated ; i.e. show in UI of frontend that message has been sent befor eonly immediately so that user doesn't feel any delay ; and after that send the request to backedn below ; so lets try to make our app optimal here below.

            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}` , messageData);

            // step654: now lets try to update the "messages" array state here below.

            // step656: now we will add the new message to the messages array here below ; so use the concat method which adds the new message at the end of the array here below.
            set({messages: messages.concat(res.data)});

        } catch (error) {

            // step692: now we were showing the latest sent message in the UI as soon as user sends it without waiting for backend to send a response ; but now if backend sends a error response back ; then that message should be removed from UI ; so lets remove it from UI here below ; so we set the messages state to the previous messages state without concatinating it in the try block that we had in try block "concat" without that only we set the messages state to previous messages state only in the database.

            // step693: now if we change the /send endpoint above to something like /send124 : backend will throw an error in response ; run this catch block ; remove that messaeg from UI immeditaley and show toast error there ; you can check it out to see how working there too now.

            // step694: see the next steps in the chatContainer.jsx file now there.
            set({messages : messages})

            // step657: now lets use conditional rendering here below to show the error toast if the error response is not undefined because if error itself is undefined how will you do error.response , etc. , otherwise we will show the default error message here below.

            // step658: see the next steps in MessageInput.jsx file now there.
            toast.error(error.response?.data?.message || "Something went wrong")
        }
    },

    // step784: now lets create function here below to listen any incoming messages here below.
    subscribeToMessages: () => {
        const {selectedUser, isSoundEnabled} = get();

        // step785: if there is no selected users , just return as if no user is selected , why will we show the incoming messages there.
        if(!selectedUser) return;

        // step786: but if we select a user ,we should update the message section immediately on the screen there.

        // step787: now get the socket connection here below.
        const socket = useAuthStore.getState().socket;

        // step788: now lets listen to the "newMessage" event here below using the socket ; and we will get the newMessage from mesage.controller.js that we had sent when making this event there in message.controller.js file there.
        socket.on("newMessage" , (newMessage)=>{

            // step800: now lets create a variable to check if message is sent by the selected user or not here below ; i.e. by the user whose chat we have opened on the app by selecting that user there.
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;

            // step801: so now if the message is not sent by the selected user then we will return here below as then no need to do anything ; ITS BECAUSE THE ISSUE HERE IS THAT PROBLEM IS COMING THAT IF WE HAVE THREE USERS IN CHATS SECTION , USER1, USER2 AND USER3 : IF WE HAVE TWO LAPTOPS IN ONE WE HAVE USER1 AS SENDER , WHO SENT MESSAGE TO USER2 , BUT USER2 IS READING MESSAGES OF USER3 (USER3 IS OFFLINE CURRENTLY) ; SO IT WILL SHOW THERE WHOEVER CHAT WE HAVE OPENED LIKE USER3 CHAT WILL SHOW THE RECIEVED MESSAGE BUT IT WAS SENT BY USER1 ; SO THIS IS THE ERROR ; FOR THAT ONLY WE WILL NOT UPDATE THE UI INSTANTLY IN REAL TIME IF THE MESSAGE IS NOT SENT BY THE SELECTED USER , SO THAT LATER WHEN USER1'S CHAT WILL BE OPENED THE NEW MESSAGE WILL BE VISIBLE THERE NOW ; AND NOT IN ANY OTHER USER'S CHAT WHOSE CHATBOX WE HAVE JUST OPENED ; THATS WHY WE HAVW TH EBELOW CODE WRITTEN HERE BELOW.

            // step802: see the next steps in step803.txt file now there.
            if(!isMessageSentFromSelectedUser) return;

            // step789: so lets update the message state here below with the new message received here below.

            // step790: lets first get the current messages state here below.
            const currentMessages = get().messages;

            // step791:and then update the message state here below with the new message received here below ; "..." used so that it maintains all current messages first and add the new message at the end here below.
            set({messages: [...currentMessages , newMessage]})

            // step792: now if sound is enabled , we will play a notification sound here below and log an error if it fails to play.
            if(isSoundEnabled){

                // step795: lets import the notification sound here below.
                const notificationSound = new Audio("/sounds/notification.mp3");

                // step793: as always first reset the notification sound everytime for new message from the start so that it doesn;t plays from where it stopped last time , but rather from the beginning here below.
                notificationSound.currentTime = 0;
                notificationSound.play().catch((e) => console.log("Audio playing failed: ",e));
            }
        })
    },

    // step794: now lets make the unsubscribe function here below ; its needed because : f you don’t remove old listeners, each re-entry adds duplicate listeners—causing repeated messages in UI and wasted memory/performance ; The issue will be duplicate messages showing in chat and unnecessary memory/performance usage.
    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;

        // step795: socket.off("newMessage") → detaches the previously attached event listener.

        // step796: now see the next steps in chatContainer.jsx file now there.
        socket.off("newMessage");
    },
}))