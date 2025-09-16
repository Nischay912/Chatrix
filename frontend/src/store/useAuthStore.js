// step339: so we will have a zustand store , in which we can have many different states ; and then in our application , we can use it at any place ; either in App.jsx or in any of its children or in any of its grandchildren directly without prop-drilling i.e. without passing props manually to each component and then to component inside that component and so on.

// step340: lets first create the zustand store here below.
import { create } from "zustand";

//  step341: now lets create a hook to use the zustand store here below ; just like we ahve hooks called useState and all.

// step342: set is a function provided by Zustand to update the state inside the store (like React’s setState we have like setName and all) ; The function returns an object that contains your initial state and actions (functions).
export const useAuthStore = create((set) => ({

    // step343: now we can create all the states here below.
    authUser: {name: "Nischay" , _id: 123, age: 25},
    isLoggedIn: false,

    
    // step344: we can also create functions inside the store this like done here below.
    
    // step345: now any of the pages in the app can use these states in any of the components directly now.
    
    // step346: we just have to go in App.jsx file there and see the next steps there.
    login: () => {
        console.log("We just logged in");

        // step352: now we can use the "set" function like the "setName and all of React" so that : we can update the states , like below , once login method is called we want to update the isLogeedIn state to true.

        // step353: so the set method below can be called with multiple key-value pairs to set multiple state's values at once too , like : if we had isLoading:true , then we can do : set({isLoading: true , isLoggedIn: true})

        // step354: also we can call this set function later in this login function after more coiple of lines of code inside this function , if it was there , we can call this set function again inside the same function again there too : so we can call the set function multiple times in a function too , thus here below.

        // step355: so now see the next steps in App.jsx where we will call this function from the zustand store to update the state value from false to true.
        set({isLoggedIn: true});
    }
}));
