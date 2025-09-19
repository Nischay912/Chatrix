import React, { useRef } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { useChatStore } from '../store/useChatStore.js'
import { useEffect } from 'react'
import ChatHeader from './ChatHeader.jsx'
import NoChatHistoryPlaceholder from './NoChatHistoryPlaceholder.jsx'
import MessageInput from './MessageInput.jsx'
import MessagesLoadingSkeleton from './MessagesLoadingSkeleton.jsx'

function ChatContainer() {

  // step591: first lets try to get all the required states here below from the useChatStore hook and the useAuthStore hook.
  const {authUser} = useAuthStore();
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } = useChatStore();

  // step696: lets create the reference of messageEndRef here below using the useRef hook here below.
  const messageEndRef = useRef(null);

  // step592: now lets useEffect to load the messages when the selectedUser or the getMessagesByUserId function changes here below.
  useEffect(() => {

    // step593: make sure to run this only if the selectedUser is not null here below i.e. initially when page is refreshed , no user is clicked and selected , so in that case we don't want to get the messages here below , so run this only if the selectedUser is not null.
    if(selectedUser) getMessagesByUserId(selectedUser._id);
  }, [selectedUser , getMessagesByUserId]);

  // step697: now this code below will make the chat scroll down to the bottom when a new message is sent here below.
  useEffect(() => {
    // step698: we put if statement below because we had set its initial value to "null" and so Skip it on the first render (or if for some reason the ref hasn’t attached yet) ; as then : null.current makes no sense but error only.
    if(messageEndRef.current){
      messageEndRef.current.scrollIntoView({behavior: "smooth"});
    }

    // step699: this will run and scroll to bottom div there : whenever you receive/send a new message and messages state updates, this effect runs again.

    // step700: thus overall when we send a new message or receive a new message , this code will run and scroll to bottom div there automatically.

    // step701: see the next steps in step702.txt file now there.
  }, [messages]);

  return (
    <>
      {/* step594: we will have a ChatHeader component on the top of the chat container here below. */}

      {/* step595: see the next steps in ChatHeader.jsx file now there. */}
      <ChatHeader />

      {/* step609: now lets make the main message display section below the header here below. */}

      {/* step610: given overflow-y-auto which makes the content scrollable in y direction if the number of messages exceeds the height of the container */}

      {/* step611: the flex-1 class makes the div take up all the available space in the flexbox. */}
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {/* step612: now we will display all the messages from the messages array here below. */}

        {/* step613: so if messages are there then we will display them here below ; else we will show a noChatHistoryPlaceholder component here below in which we pass the selected user's full name as a prop named "name" here below. */}
        {/* {messages.length > 0 ? ( */}

        {/* step632: now we add one more condition here below that if the message loading state is false currently and we have messages to be shown, lets show a loader on screen while its loading the messages from the database on the screen there. */}

        {/* step633: so if we are not in loading state i.e. (!) is there , then we go ahead and show the messages here below ; so put a conditional rendering here below based on this condition here below. */}
        {messages.length > 0 && !isMessagesLoading ? (
          // step618: now lets make the message section to be shown if the user already has some messages with the selected user here below.
          <div className="max-w-3xl mx-auto space-y-6">

            {/* step619: now we will use the "map" to loop through and get all the messages from the messages array here below. */}
            {messages.map(msg => (
              // step620: we will now be having a message card UI for each message here below.
              <div
              // step621: like by rule map function always uses a unique key , so we will use the message id as the key here below.
               key={msg._id}

              //  step622: now each message will get the "chat" class of daisyUI for sure ; but if the message's sender id is the id of the authernticated logged in user , keep the class as "caht-end" to look like sender's message and if the message's reciever id is the id of the authernticated logged in user , keep the class as "caht-start" to look like reciever's message here below.
               className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
              >

              {/* step623: now we will have the chat-bubble class of daisyUI for sure here below , but have specific colors for the sender's message and reciever's message here below. */}

              {/* step624: also we will have relative class always on both sender's and reciever's messages here below because : relative on the bubble makes the absolute positioning of the timestamp work to be positioned w.r.t the message inside the bubble and not somewhere else on the page. */}
                <div className={`
                  chat-bubble relative ${
                    msg.senderId === authUser._id 
                    ? "bg-[#0091b9] text-[#F9FAFB]" 
                    : "bg-[#3d426f] text-[#E5E7EB]"}`}>
                  
                  {/* step625: now we can have either the message text or the image here below ; so if the message has an image , we will show it here below ; else if image part is null ; skip ahead and show text only. */}

                  {/* step626: also if a message has both image and text we will see both of them as then both of the below divs will be shown and thus image followed by text will be shown to us thus there. */}
                  {msg.image && (
                    <img src={msg.image} alt="Shared" className='rounded-lg h-48 object-cover' />
                  )}

                  {/* step627: now we have some top margin to message as we will be showing the timestamp below the message there. */}
                  {msg.text && <p className='mt-2'>{msg.text}</p>}

                  {/* step628: now lets try to show the timestamp here below. */}
                  <p className='text-xs mt-1 opacity-75 flex items-center gap-1'>

                    {/* step629: new Date converts the timestamp string into a JavaScript Date object, so you can manipulate it ; then we converts the Date object into an ISO string like "2025-09-18T04:15:00.000Z" : Format: YYYY-MM-DDTHH:MM:SS.sssZ ; and now in ISO format ; time is in 24-hour format starting at index 11 and ending at index 16 so we will slice the string from index 11 to 16 here below and thus display the time in this p tag here below. */}

                    {/* step630: now we used the createdAt and updatedAt from database that gets accessible because we did : timestamps: true in the messageSchema earlier there. */}
                    {/* {new Date(msg.createdAt).toISOString().slice(11,16)} */}

                    {/* LATER GOT THIS CODE-RABBIT SUGGESTION TO GET TIME LIKE THIS HERE BELOW. 
                    
                    So, here : createdAt is a timestamp from the database, automatically generated because you used timestamps: true in your MongoDB schema ;Example value: "2025-09-18T04:15:00.000Z" (ISO 8601 format, UTC time) ; new Date(...) converts the timestamp string into a JavaScript Date object ; This object lets you easily extract hours, minutes, seconds, etc., and do date/time formatting ; toLocaleTimeString(locale, options) always formats the Date object according to the local timezone unless you specify a timezone in options ; The first argument to toLocaleTimeString(locale, options) specifies locale/language (like "en-US" or "fr-FR") ; If you pass undefined, it defaults to the user’s browser/system locale ; So your app automatically adapts to local time formatting thus here below.

                    */}
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* step695:now lets create a reference div here after all the messages in the chat container , which will be used to automatically scroll the messages to this reference div when a message is sent so that the CHAT CONTAINER AUTOMATICALLY SCROLLS DOWN TO THIS DIV AT END OF THE MESSAGES ; so : ONCE A MESSAGE IS SENT , THE CHAT CONTAINER AUTOMATICALLY SCROLLS DOWN TO THIS DIV. */}
            <div ref={messageEndRef} />

          </div>
        ) :

        // step634: now after the <condition> ? <statement1> : "its time for" the false condition statement part here below ; so if messages are not there , then also first check if messages are loading or not ; if loading show the message laoding skeleton here below ; else show the "no messages" text here below.

        // step635: so if messages are loading we will show a loader here below ; else if messages are not loading we will show the "no messages" text here below.

        // step636: see the next steps now in the step637.txt file now there.
        isMessagesLoading ? <MessagesLoadingSkeleton /> :
        
        (
          // step614: see the next steps now in the NoChatHistoryPlaceholder.jsx file there.
          <NoChatHistoryPlaceholder name={selectedUser.fullName} />
        )}
      </div>

      {/* step631: now lets make the message input component for sending messages here below */}
      <MessageInput />

    </>
  )
}

export default ChatContainer
