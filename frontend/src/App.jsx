// step316: type rafce > enter : and lets start to build the frontend of our application now ; but before that see the next steps in step317.txt file there.
import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import ChatPage from './pages/ChatPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { useAuthStore } from './store/useAuthStore.js'
import PageLoader from './components/PageLoader'
import { Toaster } from 'react-hot-toast'

const App = () => {

  // step372: now lets use the zustand store to fetch all the states and functions in it here below to be used in all the components of our app now here.
  const {checkAuth , isCheckingAuth , authUser} = useAuthStore();

  // step373: now lets call the the checkAuth function here below to check if the user is authenticated or not as soon as the page is loaded here below using the useEffect with [checkAuth] as [checkAuth] means that : When the component first loads, call checkAuth() to check if the user is authenticated ; and even if by some means if the checkAuth function changes then will call this function again ; but in practice, Zustand store actions usually don’t change, so it will usually run only once when the page loads so that it can check if the user is authenticated or not.
  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  // step374: now lets console log the authUser state here below to check if the user is authenticated or not ; as it will be "null" if user is not authenticated ; else will have the user object in it.

  // step375: to run all this ensure to do npm run dev in both "cd frontend" and "backend" as well but we will get CORS error as the backend and frontend are at different PORTS , so the CORS policy prevents sending request to different PORTS ; so for that see the steps in step376.txt file now there.
  // console.log("Auth user:" , authUser);

  // step383: now if the checking is currently in progress , we can show a Page Loader Component here below.

  // step384: see the next steps in components folder's PageLoader.jsx file now there.
  if(isCheckingAuth) return <PageLoader />

  // step347: we can now destructure all the states and the functions using the the zustand store named as useAuthStore here below.
  // const { authUser , isLoggedIn, login } = useAuthStore();

  // step348: lets try to console log the authUser state here below , to show that we can use the states now here in this component directly.

  // step349: we can see in frontend i.e. broswer's console that we can access and printed these values there ; so we can now easily access these state's values in our compontents directly now.

  // step350: now we can use them inside any of other components like signup page , login page , chat page , etc. :  by just importing the states using the hook we made : const { authUser , isLoggedIn } = useAuthStore(); in all of them and can use them there directly now.

  // step351: you can try it in those pages and after that see the next steps in useAuthStore.js file now there.
  // console.log("Auth user:" , authUser);
  // console.log("Is logged in:" , isLoggedIn);

  return (

    // step323: now lets add a background here wrapping everything as we want this styled background to be present on all the pages we have in our application now.

    // step324: lets make it take full height of device as its height using "min-h-screen" class here below.

    // step325: also lets make it a flexbox here below so that the contents becomes fully centered in the screen and also have it with some padding and hide the overflow using overflow hidden.
    <div className='min-h-screen bg-slate-900 relative flex justify-center items-center overflow-hidden p-4'>

      {/* step326: now using AI generate some grid type bg and glow shapes i bg for all the pages for the app here below. */}

      {/* step327: see the next steps in step328.txt file now there. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f7ff10_1px,transparent_1px),linear-gradient(to_bottom,#00f7ff10_1px,transparent_1px)] bg-[size:20px_20px]"/>
        <div className="absolute top-0 -left-4 w-96 h-96 bg-cyan-400 opacity-20 blur-[100px] rounded-full animate-pulse"/>
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-pink-500 opacity-20 blur-[100px] rounded-full animate-pulse"/>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-purple-500 opacity-15 blur-[90px] rounded-full"/>

        {/* step356: lets test the function "login" from the zustand store which will update the isLoggedIn state to true here below. */}
        {/* <button onClick={login} className='z-10'>Login</button> */}

        {/* step357: lets see the next steps in step358.txt file now there. */}

    {/* // step318: now lets wrap the whole app with the Rout component here below , so that : we can have multiple pages inside our application ; so here we list all the routes that our app will support. */}
    <Routes>
      {/* step319: lets now put specific routes inside this now here below. */}

      {/* step320: Each <Route> below now : defines a URL path and says which component should be shown when that URL is visited. */}

      {/* step321: lets say when user visits "/" route , then we will show them the ChatPage.jsx component there to the user. */}

      {/* step322: now we can check and see that if we go on "localhost:5173/" then we will see the content of the ChatPage.jsx component there , similarly if we go on "localhost:5173/login" then we will see the content of the LoginPage.jsx component there and so on. */}

      {/* step377: now if the user is not authenticated we will want it to be redirected automatically to the login page ,so lets do that below. */}

      {/* step378: so the below code : checks if user is authenticated or not based on the authUser value ; if its not null , we take the user to the chat Page ; but if its null we use the Navigate component to redirect the user to the login page using the below syntax of the Navigate component here below. */}
      <Route path="/" element = {authUser ? <ChatPage /> : <Navigate to={"/login"} />} />

      {/* step379: same we can do for the login page that : if user is not authenticated , ok keep them at login page , but if they are authenticated , then we can navigate them to the home page. */}
      <Route path="/login" element = {!authUser ? <LoginPage /> : <Navigate to={"/"} />} />

      {/* step380: lets do the same for the signup page here below. */}

      {/* step381: see the next steps in step382.txt file now there.*/}
      <Route path="/signup" element = {!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
    </Routes>

    <Toaster />

    </div>
  )
}

export default App
