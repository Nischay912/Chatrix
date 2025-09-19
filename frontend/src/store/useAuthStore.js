// step339: so we will have a zustand store , in which we can have many different states ; and then in our application , we can use it at any place ; either in App.jsx or in any of its children or in any of its grandchildren directly without prop-drilling i.e. without passing props manually to each component and then to component inside that component and so on.

// step340: lets first create the zustand store here below.
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

// step750: lets create a base url variable here below ; same as done in and explained in "axios.js" file earlier there.
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

//  step341: now lets create a hook to use the zustand store here below ; just like we ahve hooks called useState and all.

// step342: set is a function provided by Zustand to update the state inside the store (like React’s setState we have like setName and all) ; The function returns an object that contains your initial state and actions (functions).
export const useAuthStore = create((set,get) => ({

    // step360: lets create a state for the authenticated users , which will initially be null ; once the user has been checked if he is authenticated , then we will update this state with that user's object later there.
    authUser: null,

    // step361: also lets add a loading state below which will be initially true and checking the authenticity of the user when we visit the page for the first time.
    isCheckingAuth: true,

    // step397: lets define the isSigningUp variable initially be false.
    isSigningUp: false,

    // step445: now we will use a isLoggingIn state to check if we are logging in now or not.
    isLoggingIn: false,

    // step553:now lets make a state to control the laoder to show when uploading the profile picture.
    isUploadingProfile: false,

    // step745: lets create a state called socket first here below.
    socekt:null,

    // onlineUsers state created to be used later.
    onlineUsers: [],

    // step362: now lets create a function to check the authenticity of the user here below.
    checkAuth: async() =>{
        try {

            // step363: lets try to make a GET request to the backend ; and store the response in a variable here below.

            // step364: we make call just to "/" and not whole "http://localhost:3000/api/auth/check" ; its because in the axiosInstance we have already made the baseURL as the this much part : "http://localhost:3000/api" so in every GET request made using axiosInstance , the baseURL will always be : "http://localhost:3000/api" ; so we just make a GET request to "/suth/check" here below , and it automatically will be : "http://localhost:3000/api/auth/check" .
            const res = await axiosInstance.get("/auth/check")

            // step365: the response will give us a response which will either be the user object or error if user is not authenticated.

            // step366: so lets set the authUser state to that response here below ; and also make the checkingState to false as checking for authenticity is done now.
            set({authUser: res.data})

            get().connectSocket()

        } catch (error) {
            // step367: now if there comes any error , we can console log it here below.
            console.log("Error in authCheck:" , error);

            // step368: and then if we have some errors in doing the check , user is not authenticated , so keep the authUser state value as null still there.
            set({authUser: null});
        }

        // step369: we can also have a finally block here to run after the try-catch block here below.
        finally{
            // step370: finally ; either we succeed in checking the auth or not , we can make the checkingAuth state to false now as the checking process is done now.
            set({isCheckingAuth: false})

            // step371: see the next steps in App.jsx file now there.
        }
    },

    // step398: now lets define the signUp method here below ; which will take some data as input which will actually be the fullName , email and password.
    signUp: async(data) =>{
        // step399: at beginning only first lets set the isSigningUp state to true now as we are signing up now.
        set({isSigningUp: true})
        try {
            // step401: now here we will be sending a POST request to the endpoint to help signing up there using the sent data.
            const res = await axiosInstance.post("/auth/signup" , data)

            // step402: now we will update the authenticated user with the response we recieve back ; because in the backend's auth.controller.js file too we were sending back a response object at end of the signup function , once user signs up successfully there ; so that response will be sent from endpoint in the "res" above ; and we will update the authUser with that response object here below.
            set({authUser: res.data})

            // step403: and then lets send a react toast here below ; so for that see the next steps first in the step404.txt file now there.

            // step405: now lets use the toast here below to show a success message to the user that he has signed up successfully.
            toast.success("Account created successfully")

            get().connectSocket()

        } catch (error) {
            // step406: now here in catch section , lets put a toast for the error message here below ; using the below syntax by which we can access the error in axios.
            toast.error(error.response.data.message)

            // step407: see the next steps now in SignUpPage.jsx file now there.
        }

        // step400: and after the try-catch block , we can set the isSigningUp state to false now as signing up is done now.
        set({isSigningUp: false})
    },

    // step443: now similar to the signup function , we can create a login function here below for the login page too.

    // step444: now we will have the "data" as the email and password which will be recieved by this function here below.
    login: async(data) => {
        // step446: initially we are logging in now , so set the isLoggingIn state to true now.
        set({isLoggingIn: true})        

        // step447: rest below similar to the signup function written above.

        // step448: see the next steps now in LoginPage.jsx file now there.
        try {
            const res = await axiosInstance.post("/auth/login" , data)
            set({authUser: res.data})
            toast.success("Logged in successfully")

            // step761: now once we login and show the success toast , we can call the connectSocket function here below using the get() method , because to call a function of a store , we need to use the get() method.

            // step762: same do in signup too there and also for checkAuth because even if user refresh the page , and by cookies he is still authenticated , the page should still show if online , so use it there too.
            get().connectSocket()

        } catch (error) {
            toast.error(error.response.data.message)
        }
        finally{
            set({isLoggingIn: false})
        }
    },

    // step454: lets make the logout function here below.
    logout: async(data) => {
        try{
            // step455: logout occurs very fast so no need to have isLoggingOut state for this here.

            // step456: lets make a post request now to the logout endpoint that will send the jwt token or cookie of the current logged in user to make the backend log out the user at the logout endpoint.
            await axiosInstance.post("/auth/logout")

            // step457: also we remove the current user from the authUser state here below , making it null again as user is logged out now.
            set({authUser: null})

            // step458: now show toast here below.

            // step459: see the next steps in the ChatPage.jsx file now there.
            toast.success("Logged out successfully")

            // step763: after logout , we can call the disconnectSocket function here below using the get() method , because to call a function of a store , we need to use the get() method.

            // step764: see the next steps in ChatsList.jsx file now there in frontend.
            get().disconnectSocket()
        }
        catch{
            toast.error("Error in logging out")
            console.log("Logout error" , error)
        }
    },

    // step545: now we need to make the profile url to also be updated to cloudinary ; so let smake a method to call our backend and do so ; so it will be getting some data as input , which will actually be the profile picturethat user wants to upload.
    updateProfile: async(data) =>{
        // step554: lets make the isUpdatingProfile state to true now as we are updating the profile now.
        set({isUpdatingProfile: true})
        try {
            // step546: so lets send the put request to send the profile picture data to the backend ; its PUT nad not POST because in the routes folde rof backend also we had PUT request for updating the profile picture ; as for update we generally use PUT request and not POST request.
            const res = await axiosInstance.put("/auth/update-profile" , data)

            // step547: now lets set the authenticated user to the response we recieve back from the backend here below with the updated profile picture url.
            set({authUser: res.data})

            // step548: lets show some toast like here below.

            // step549: see the next steps in the ProfileHeader.jsx file now there.
            toast.success("Profile picture updated successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
        // step555: and after the try-catch block , we can set the isUpdatingProfile state to false now as updating the profile is done now.

        // step556: see the next steps in the ProfileHeader.jsx file now there.
        finally{
            set({isUpdatingProfile: false})
        }
    },

    // step746: now we will have a function here below to connect to our socket server here below ; and we will be calling this whenevr we signup or login n ; so that it triggers and tells we have come online-offline.
    connectSocket: () => {
        // step747: first get the current state value for authenticated user from the state above.
        const authUser = get()
        // step748: if authenticated user not exist , then we can just return out of this function here below ; and no need to connect to the socket server now since the user is not logged in now i.e. since the user is not authenticated now.

        // step749: also in || part we say that if we are already connected , just return and don't try to connect again here below.
        if(!authUser || get().socket?.connected) return

        // step751: now lets create the socket connection here below ; so we will be connecting to the base url i.e. the backend and ensure that cookies are sent along with the handshake request so your socket authentication middleware can verify the user. 
        const socket = io(BASE_URL, {withCredentials: true})

        // step752: now we can connect to the socket server here below and then set the socket state with this socket connection here below.
        socket.connect()
        set({socket: socket})

        // step753: now we will be listening for events coming from backend via socket server here below.
        // step754: and as seen earlier , we use "socket.on" to listen for events using their name.

        // step755: so lets get the online user ids here below using the "getOnlineUsers" event name.
        socket.on("getOnlineUsers" , (userIds) => {
            // step756: now we can update the online users list here below.
            set({onlineUsers: userIds})
        })
    },

    // step757: now lets make another method here below to disconnect from the socket server.
    disconnectSocket: () => {
        // step758: first get the current state value for socket from the state above and then call the disconnect method on it, so that we can disconnect from the socket server here below ; so by disconnect() , we Calls Socket.IO’s .disconnect() method on the client & This cleanly closes the WebSocket connection to the server ; On the server side, this will trigger the disconnect event for that socket.
    
        // get().socket?.disconnect()

        // step759: but to be more optimized lets call the disonnect , only if the socket is currently connected , else no need to call it obviously here below.

        // step760: now when we login we will call the connectSocket() method , so when we logout we will call the disconnectSocket() method here below.
        if(get().socket?.connected) get().socket?.disconnect()
    }

    // step343: now we can create all the states here below.
    // authUser: {name: "Nischay" , _id: 123, age: 25},
    // isLoggedIn: false,

    
    // step344: we can also create functions inside the store this like done here below.
    
    // step345: now any of the pages in the app can use these states in any of the components directly now.
    
    // step346: we just have to go in App.jsx file there and see the next steps there.
    // login: () => {
        // console.log("We just logged in");

        // step352: now we can use the "set" function like the "setName and all of React" so that : we can update the states , like below , once login method is called we want to update the isLogeedIn state to true.

        // step353: so the set method below can be called with multiple key-value pairs to set multiple state's values at once too , like : if we had isLoading:true , then we can do : set({isLoading: true , isLoggedIn: true})

        // step354: also we can call this set function later in this login function after more coiple of lines of code inside this function , if it was there , we can call this set function again inside the same function again there too : so we can call the set function multiple times in a function too , thus here below.

        // step355: so now see the next steps in App.jsx where we will call this function from the zustand store to update the state value from false to true.
        // set({isLoggedIn: true});
    // }
}));
