import React from 'react'
import { useChatStore } from '../store/useChatStore'

function ActiveTabSwitch() {

  // step559: now lets try to get the states required from the useChatStore hook here below.
  const { activeTab , setActiveTab } = useChatStore();

  return (
    // setp560: now lets try to use the "tabs" class from daisy ui here below.
    <div className='tabs tabs-boxed bg-transparent p-2 m-2'>
      {/* step561: now lets create the buttons for the tabs here below. */}

      <button
        // step562: now on clicking this button we will make the active tab as the "chats" tab ; and same for contacts tab too.
        onClick={() => setActiveTab("chats")}

        // step563: now this button will always have the "tab" class from daisy UI , but other classes of it depends on the condition that if the active tab is "chats" then we will have the below mentioned class for this , else the other one ; so for that use the syntax : className={`tab ${condition ? "some-classes" : "other-classes"}`} here below.

        // step564: same put for contacts too.

        // step565: see the next steps in the ChatsList.jsx file now there.
        className={`tab ${activeTab === "chats" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"}`}
      >
      Chats
      </button> 
      <button
        onClick={() => setActiveTab("contacts")}
        className={`tab ${activeTab === "contacts" ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400"}`}
      >
      Contacts
      </button>
    </div>
  )
}

export default ActiveTabSwitch
