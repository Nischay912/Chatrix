import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import { XIcon } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore.js'

function ChatHeader() {

  // step596: lets first try to get all the required states here below from the useChatStore hook.
  const {selectedUser , setSelectedUser} = useChatStore();

  // step771: now we again try to get the onlineUsers state here below from the useAuthStore hook and also for the selected user whose message section has been selected , we get to know if he is online or not in the variable below.
  const {onlineUsers} = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

    // step605: now we want to also close the chat when user presses escape key ; so lets write the useEffect here below.
    useEffect(() => {
      const closeChat = (e) => {
        if(e.key === "Escape") setSelectedUser(null);
      }
      window.addEventListener("keydown" , closeChat);

    // step606: This is the cleanup function in React’s useEffect ; When the component unmounts (or when the effect re-runs), React calls this function ; It removes the keydown listener so we don’t end up with duplicate event listeners or memory leaks.
      return () => window.removeEventListener("keydown" , closeChat);

    // step607: It will run once when the component mounts, and again if setSelectedUser ever changes (rare, since it’s usually stable).

    // step608: see the next steps in the ChatContainer.jsx file now there.
    },[setSelectedUser]);

  {/* step597: now lets make the header of the right side of the chat page here below */}
  return (
    // step598: we use justify between as we will have space between the left side containing profile pic and name and right side a cross button to clode the chat ; so we will have some space between them.
    <div className='flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 max-h-[84px] px-6 flex-1'>

        {/* step599: now lets make the components of the flexbox here below. */}
        <div className="flex items-center space-x-3">
            {/* step600: now lets make the profile pic and name here below ; the avatar is made using the daisyUI class here below. */}

            {/* <div className="avatar online"> */}

            {/* step772: now based on whether the selected user is online or not , we will add the online or offline class here below. */}
            <div className={`avatar ${isOnline ? "online" : "offline"}`}>
                <div className='w-12 rounded-full'>
                    {/* step601: so we will have the selectedUser's profile pic here below ; and if its not available we will have the default profile pic. */}
                    <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
                </div>
            </div>
            {/* step602: now lets make the username and online status here below. */}
            <div>
                <h3 className='text-slate-200 font-medium'>{selectedUser.fullName}</h3>

                {/* step774: also the text shown here below will be based on whether the selected user is online or not. */}

                {/* step775: see the next steps in step776.txt file now there. */}
                <p className='text-slate-400 text-sm'>{isOnline ? "Online" : "Offline"}</p>
            </div>
        </div>

        {/* step603: now lets make the close button here below. */}
        <button
            // step604: now clicking on the cross icon we will make the selected user as null , so that we can close the chat indirectly as if selected user itself is null , then there will be no chat to show in the message section here below.
            onClick={() => setSelectedUser(null)}
        >
            <XIcon className="w-5 h-5 text-cyan-400 hover:text-slate-200 transition-colors cursor-pointer" />
        </button>
    </div>
  )
}

export default ChatHeader
