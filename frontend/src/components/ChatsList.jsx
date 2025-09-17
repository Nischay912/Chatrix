import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import UsersLoadingSkeleton from './UsersLoadingSkeleton.jsx';
import NoChatsFound from './NoChatsFound.jsx';

function ChatsList() {
  // step566: lets try to get all the required states here below from the useChatStore hook.
  const {getChatPartners , chats , isUsersLoading , setSelectedUser} = useChatStore();

  // step567: now we will call the getMyChatPartners function here below to get the chat partners as soon as the component mounts and also if and when the chat partners change.
  useEffect(() => {
    getChatPartners();
  }, [getChatPartners]);

  // step568: now if we are in the loading state , then we can return the usersLoadingSkeleton component here below ; we had made that component to have a pulsing animation and runs loop three times there to show three fake users with a circle a longer div and a shorter div there to make it look like users are being loaded when we are in the loading state.
  if(isUsersLoading) return <UsersLoadingSkeleton />

  // step569: and if there are no chat partners then we show the noChatsFound component here below ; in that code we had that : it will show the UI we defined in that component there ; and once we click on the button there we make the contacts as the active tab there and show the contacts there.
  if(chats.length === 0) return <NoChatsFound />

  return (
    <>
      {/* step570: now lets map through the entire "chats" array and for every chat we will have a specific UI displayed in this component here below. */}
      {chats.map((chat) => (

        // step571: by rule map needs id , so lets use the chat id as the key here below.
        <div 
          key={chat._id} 
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors" 
          
          // step572: now lets make the chat currently clicked as the selected user here below so that we can show its messages later in the message section here below.
          onClick={() => setSelectedUser(chat)}
        >
        {/* step573: now lets display the chat details here below */}
          <div className="flex items-center gap-3">

            {/* step574: lets use the daisy ui to show the avatar here below with the online status too here below. */}
            <div className="avatar online">
              {/* step575: now lets also show the profile pic which if is null , then we will show the default avatar there and also then show its username here below. */}

              {/* step576: see the next steps in ContactsList.jsx file now there. */}
              <div className="size-12 rounded-full">
                <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} />
              </div>
            </div>
            <h4 className='text-slate-200 font-medium truncate'>{chat.fullName}</h4>
          </div>
        </div>
      ))}
    </>
  )
}

export default ChatsList
