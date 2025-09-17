// step465: lets import the create function from the zustand package to start creating the zustand store here below.
import { create } from "zustand"
import { axiosInstance } from "../lib/axios"
import toast from "react-hot-toast"

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
    }
}))