// step392: start off by writing rfce and getting the boilerplate here below.
import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer.jsx'
import { MessageCircleIcon, UserIcon, MailIcon , LockIcon , LoaderIcon, CheckIcon } from 'lucide-react'
import { Link } from 'react-router'

function SignUpPage() {

  // step393: now in signup page we want to have three states : one for full name , then email and finally password ; so we have create a state formData and getFormData ; and getFormData will be a function to get the data from the form and set it in formData state here below ; initially formData will be empty i.e. {fullName:"" , email:"" , password:""}
  const [ formData , getFormData ] = useState({fullName:"" , email:"" , password:""})

  // step395: also lets get the signup method and the loading state from the zustand store here below.

  // step396: lets define these states and methods in the zustand store in useAuthStore.js now there.
  const {signUp , isSigningUp} = useAuthStore()

  // step394: now lets write a function to handle the form submission here below.
  const handleSubmit = (e) => {
    // step435: now lets prevent the default behaviour of the form here below ; Stops the default browser behavior of form submission ; Normally, when you submit a form in HTML: The browser reloads the page ; which we don't want here now.
    e.preventDefault();

    // step436: now this handleSubmit runs as soon as we submit the form ; so now here lets call the signUp method from the zustand store with the formData here below so that it sends this form as the request body to the backend and save the user there.

    // step437: see the next steps in step438.txt file now there.
    signUp(formData)
  }
  {/* step408: now lets create the UI of the signup page here below. */}
  return (
    <div className='w-full flex items-center justify-center p-4 bg-slate-900 min-h-screen'>
      <div className='relative w-full max-w-6xl'>
        {/* step409: now lets make a moving animated border to be there in all the pages ; so lets make a component in the BorderAnimatedContainer.jsx file now there so that we can use it wherever in all pages if we want; so see the next steps there now. */}

        {/* step415: now lets wrap whatever we want to have inside that border and this border now will move around whatever we place inside it. */}
        <BorderAnimatedContainer>

          {/* step416: lets make the container to be flex box in larger devices but one below the other in smaller devices. */}
          <div className="w-full full flex flex-col md:flex-row">
            {/* step417: lets build the left side of the container first for form filling. */}

            {/* step418: border-slate-600/30 : Sets the border color to slate-600 with 30% opacity ; also add a right border in larger screens only as we will be having the sections one beside the other in larger screens but flex col in smaller screens. */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center items-center md:border-r border-slate-600/30">

            {/* step419: now lets make the inner box inside left section like the form card which will have some maximum width and take 100% width of its parent but never exceed the maximum width given below. */}
              <div className="w-full max-w-md">
                {/* step420: now lets create the heading which will have some texts and at top of it will be a message icon we get using LUICDE REACT ICONS. */}
                <div className="text-center mb-6 md:mb-8">
                  <MessageCircleIcon className="w-10 h-10 md:w-12 md:h-12 mx-auto text-cyan-500 mb-3 md:mb-4" />
                  <h2 className='text-xl md:text-2xl font-bold text-slate-200 mb-2'>Create Account</h2>
                  <p className='text-slate-400 text-sm md:text-base'>Sign Up for a New Account</p>
                </div>

                {/* step421: now lets create the form now here below ; that will run the handleSubmit function on submitting it. */}

                {/* step422: lets give some spacing between each input tags using space-y here below. */}
                <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
                  {/* step423: now lets create the input fields for full name , email and password here below. */}
                  <div>
                    {/* step424: lets design the label for fullName first here below : A label is visible text that describes the input ; its not a placeholder but a text written outside the input tag to tell what that input is for ; whereas placeholder is visible text that appears inside the input field when the input is empty. */}

                    {/* step425: now we will be making the input tags similar so labels will have same styles ; so instead of writing the same style again and again ; lets make a single class "auth-input-label" which will be a reusable class which we can set up in index.css and reuse with that class name for all css directly from there ; so put the reusable css under a single name in index.css and then use it here below. */}
                    <label className='auth-input-label'>Full Name</label>
                    <div className="relative">
                      <UserIcon className='auth-input-icon' />
                      <input 
                      type="text" 
                      // step426: the value written inside the input tag will be depended on what is the value of fullName inside the formdata state which is of the form : {fullName:"" , email:"" , password:""} ; so lets make the value of the input tag to be the value of fullName in the formdata state ; By setting value={formData.fullName}, whatever is typed in the input is always synced with the state's value.
                      value={formData.fullName }

                      // step427: now whenever user types anything the onChange function below runs , in which : "e" : contains information like what element changed, what its value is, etc ; target → The actual DOM element that triggered the event (here, the <input>) ; e.target.value : The current text inside the input box. This is what the user just typed.

                      // step428: Spread operator ...formData copies all existing fields (like email, password), then we overwrite fullName with the new value from the input field here and place the updated object back into formData using the getFormData function which is the function to update the formdata state with the updated values.

                      // step429: React re-renders the input with the updated value, keeping it in sync.
                      onChange={(e) => getFormData({...formData , fullName:e.target.value})}

                      // step430: now we use daisyUI input class here to make the input field look nice ; also add the placeholder text inside the input field here below.
                      className='input' 
                      placeholder='Nischay Kumar' />
                    </div>
                  </div>

                  {/* step431: now lets create the input fields for email and password here below in the same way as we did for fullName. */}
                  <div>
                    <label className='auth-input-label'>Email</label>
                    <div className="relative">
                      <MailIcon className='auth-input-icon' />
                      <input 
                      type="email" 
                      value={formData.email }
                      onChange={(e) => getFormData({...formData , email:e.target.value})}
                      className='input' 
                      placeholder='nischaykumar.dev@gmail.com' />
                    </div>
                  </div>

                  <div>
                    <label className='auth-input-label'>Password</label>
                    <div className="relative">
                      <LockIcon className='auth-input-icon' />
                      <input 
                      type="password" 
                      value={formData.password }
                      onChange={(e) => getFormData({...formData , password:e.target.value})}
                      className='input' 
                      placeholder='Enter your password' />
                    </div>
                  </div>
                  
                  {/* step432: now lets create the submit button here below ; which will be disabled if the isSigningUp state is true ; so that the user can't click it multiple times , when its loading there. */}
                    <button type='submit' className="auth-btn w-full flex items-center justify-center" disabled={isSigningUp}>

                      {/* step433: so we will show the loader icon here below if the isSigningUp state is true , so that the user can't click it multiple times , when its loading there & else show the text "Create Account" when its not loading there. */}
                      {isSigningUp ? (
                        <>
                          <LoaderIcon className='w-5 h-5 animate-spin mr-2' />
                          Creating Account...
                        </>
                      ) : "Create Account"}
                    </button>

                    {/* step434: now lets have a link here below to go to the login page ; <Link> is a React Router component used for navigation between pages/routes in a React app ; Instead of using a normal <a> tag, we use <Link> because it prevents the page from reloading when navigating between pages there. */}
                    <div className="mt-4 md:mt-6 text-center">
                      <Link to="/login" className="auth-link text-sm md:text-base">
                        Already have an account? Login
                      </Link>
                    </div>

                </form>
              </div>
            </div>

            {/* step439: now lets design the right side here below ; where the image will be hidden in the mobile view & visible in the desktop view. */}
            <div className='hidden md:w-1/2 md:flex flex-col items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent'>

              {/* step440: now lets design the image here below */}

              {/* step441: see the next steps in step442.txt file now there */}
              <div className="w-2/3 mb-8">
                <img
                  src="/signup.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain"
                />
              </div>
              
              <div className="w-full max-w-xs">
                <h3 className="text-xl font-medium text-cyan-400 text-center mb-6">Why Join Us?</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-cyan-500/10 p-1.5 rounded-full mr-3 mt-0.5">
                      <CheckIcon className="w-4 h-4 text-cyan-500" />
                    </div>
                    <div>
                      <h4 className="text-slate-200 font-medium">Secure Authentication</h4>
                      <p className="text-slate-400 text-sm">Multi-factor authentication keeps your account safe</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-cyan-500/10 p-1.5 rounded-full mr-3 mt-0.5">
                      <CheckIcon className="w-4 h-4 text-cyan-500" />
                    </div>
                    <div>
                      <h4 className="text-slate-200 font-medium">End-to-End Encryption</h4>
                      <p className="text-slate-400 text-sm">Your data is encrypted and protected at all times</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-cyan-500/10 p-1.5 rounded-full mr-3 mt-0.5">
                      <CheckIcon className="w-4 h-4 text-cyan-500" />
                    </div>
                    <div>
                      <h4 className="text-slate-200 font-medium">Privacy Focused</h4>
                      <p className="text-slate-400 text-sm">We never share your data with third parties</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-center gap-3">
                  <span className="auth-badge text-xs">Free Forever</span>
                  <span className="auth-badge text-xs">Easy Setup</span>
                  <span className="auth-badge text-xs">Private</span>
                </div>
              </div>
            </div>

          </div>
        </BorderAnimatedContainer>

      </div>
      
    </div>
  )
  
}

export default SignUpPage