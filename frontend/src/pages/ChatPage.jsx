import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'

function ChatPage() {

  // step452: now lets destructure and use the logout function here below from the useAuthStore hook.

  // step453: see the useAuthorStore.js file for the next steps there.
  const { logout } = useAuthStore();

  return (
    <div className='z-10'>
      {/* step451: we are implemnting the logout button below in the chatpage for testing purpose only here ; will make it somewhere else later. */}

      {/* step460: lets make the button to call the logout function here below on click. */}

      {/* step461: upon logout we saw in previous steps ; authUser becomes null ; so as per the ternary operator in Routes of App.jsx file ; we will be redirected to login page when it becomes null there. */}

      {/* step462: see the next steps in step463.txt file now there. */}
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default ChatPage