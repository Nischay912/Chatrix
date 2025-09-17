import React from 'react'
import { useChatStore } from '../store/useChatStore.js'
import { useEffect } from 'react'
import UsersLoadingSkeleton from './UsersLoadingSkeleton.jsx'

function ContactList() {

  // step577: lets try to get all the required states here below from the useChatStore hook.
  const {getAllContacts, allContacts , setSelectedUser, isUsersLoading} = useChatStore();

  // step578: same as done in ChatsList.jsx file now , do here too now below.
  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  // step579: same as done in ChatsList.jsx file now , do here too now below.
  if(isUsersLoading) return <UsersLoadingSkeleton />

  // step580: even the return statement will be the exact same thing as ChatList.jsx file just make it for contacts now instead of chats.

  // step581: now see the next steps in step582.txt file now there.
  return (

    <>
      {allContacts.map((contact) => (
        <div 
          key={contact._id} 
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors" 
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div className="avatar online">
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} alt={contact.fullName} />
              </div>
            </div>
            <h4 className='text-slate-200 font-medium truncate'>{contact.fullName}</h4>
          </div>
        </div>
      ))}
    </>

    /*<>
      {chats.map((chat) => (
        <div 
          key={chat._id} 
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors" 
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div className="avatar online">
              <div className="size-12 rounded-full">
                <img src={chat.profilePic || "/avatar.png"} alt={chat.fullName} />
              </div>
            </div>
            <h4 className='text-slate-200 font-medium truncate'>{chat.fullName}</h4>
          </div>
        </div>
      ))}
    </>*/
  )
}

export default ContactList
