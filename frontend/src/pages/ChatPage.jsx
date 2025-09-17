import React from 'react'
// import { useAuthStore } from '../store/useAuthStore.js'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer.jsx'
import { useChatStore } from '../store/useChatStore.js';
import ActiveTabSwitch from '../components/ActiveTabSwitch.jsx';
import ChatContainer from '../components/ChatContainer.jsx';
import ContactList from '../components/ContactList.jsx';
import ProfileHeader from '../components/ProfileHeader.jsx';
import ChatsList from '../components/ChatsList.jsx';
import NoConversationPlaceholder from '../components/NoConversationPlaceholder.jsx';

function ChatPage() {

  // step452: now lets destructure and use the logout function here below from the useAuthStore hook.

  // step453: see the useAuthorStore.js file for the next steps there.
  // const { logout } = useAuthStore();

  // step494: lets try to get the states from the useChatStore hook here below.
  const { activeTab , selectedUser } = useChatStore();

  return (
    // <div className='z-10'>
    <div className='relative w-full max-w-6xl h-[800px] '>

      {/* step486: lets wrap the content inside BorderAnimatedContainer , so that a animated border keeps moving around the content container box here below. */}
      <BorderAnimatedContainer>

        {/* step487: again now first lets try to make the left side of the chat page here below */}

        {/* step488: we have put 800/50 which means : color is 800 with 50% opacity. */}
        <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col ">

          {/* step489: so we will have 3 states in the flex column one below the other ; first we will have the profile section on top ; then a active bar between chats and contacts and finally the users list. */}

          {/* step490: so lets create our own custom component tags here below. */}
          <ProfileHeader />
          <ActiveTabSwitch />
          
          {/* step491: now lets make the users list here below. */}

          {/* step492: flex-1 makes this element take up all the remaining space in a flex container ; then overflow-y-auto will Only show a vertical scrollbar if the content is taller than the container. */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {/* step493: now if the activeTab state is set to chats we will show the chats list , else we will show the contacts list. */}
            {activeTab === "chats" ? <ChatsList /> : <ContactList />}
          </div>
        </div>

        {/* step495: now lets try to make the right side of the chat page here below */}

        {/* step496: backdrop-blur-sm will apply a small blur (4px) effect to whatever is behind the element. */}
        <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
          {/* step497: now if we have a selectedUser , then we can show the chatContainer with that user here below ; else if we don't have a selectedUser , then we can show a NoConversationComponent there on the right side of the chat page here below. */}

          {/* step498: see the next steps now in the step499.txt file now there. */}
          {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
        </div>

      </BorderAnimatedContainer>

      {/* step451: we are implemnting the logout button below in the chatpage for testing purpose only here ; will make it somewhere else later. */}

      {/* step460: lets make the button to call the logout function here below on click. */}

      {/* step461: upon logout we saw in previous steps ; authUser becomes null ; so as per the ternary operator in Routes of App.jsx file ; we will be redirected to login page when it becomes null there. */}

      {/* step462: see the next steps in step463.txt file now there. */}
      {/* <button onClick={logout}>Logout</button> */}
    </div>
  )
}

export default ChatPage