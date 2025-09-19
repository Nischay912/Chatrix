// step633: 
import React, { useState } from 'react'
import useKeyboardSound from '../hooks/useKeyboardSound.js'
import { useRef } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

function MessageInput() {
  // step644: lets get the function from useKeyboardSound.js file now here below ; which we will be using to play the sound whenevr we press any key on the keyboard while typing message in the chat app here below.
  const {playRandomKeyStrokeSound} = useKeyboardSound()
  const [text, setText] = useState("");

  // step645: lets create state to store the message texts to be sent by the user now here below.
  // const [message, setMessage] = useState("");

  // step646: also user can send image ; so we will be storing the image and showing a preview before they actually send it ; so lets create a state to store the image now here below.
  const [imagePreview , setImagePreview] = useState(null);

  // step647: now like we did in ProfileHeader ,same way here also we will be hiding the select file input file button ; so for that use the ref hook to target that input tag and trigger it when clicked on the button ; so like done in Profileheader , lets use the ref hook here too below.
  const fileInputRef = useRef(null);

  // step648: now lets get the required menthod from chatStore here below.

  // step649: see the next steps in useChatStore.js file now there.
  const {sendMessage, isSoundEnabled} = useChatStore();

  // step659: lets make the function to submit the form by enterning the message in input field there and clicking on the send button to submit it there.
  const handleSendMessage = (e) =>{

    // step660: lets write the below code , so that it doesn't refresh the page on clicking submit , which is usually the default behaviour , so we are preventing it here below.
    e.preventDefault();

    // step661: now lets make sure that if the text entered is null or no image is selected , then we don't send the message here below.

    // step662: we used trim so that the leading and trailing whitespaces can be removed.
    if(!text.trim() && !imagePreview) return;

    // step663: now if sound is enabled , we will play the sound here below.
    if(isSoundEnabled) playRandomKeyStrokeSound();

    // step664: now lets have the sendMessage method where we will pass the text and the image here below.
    sendMessage({text: text.trim() , image: imagePreview});

    // step665: now we also need to reset the input tag there , once the message has been sent.
    setText("")
    setImagePreview("");

    // step666: now if we have something there set in the input tag of type file , then we need to clear that too.
    if(fileInputRef.current) fileInputRef.current.value = "";
  }

  // step667: now we will have a function to handle the image selection here below ; we can copy and use the code made for this similarly in the ProfileHeader component now there.
  const handleImageChange = (e) =>{
    const file = e.target.files[0];
    if(!file.type.startsWith("image/")){
      toast.error("Please select an image file")
      return;
    }

    // step668: we convert it to base64 url using file reader and so now it can be inputted in img tag and shown by react , because setImage below will now set that url as the image here below.
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file)
  }

  // step669: now lets make a function to remove the image if user wants to , when previewing the image before actually sending it.
  const removeImage = () => {
    setImagePreview(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    // step670: now lets design the UI for the message input here below ; where we will have a top margin first there too to look seperated from the message list above it.
    <div className='p-4 border-t border-slate-700/50'>
      {/* step671: now if user has selected an image and the state imagePreview is not null ; we will the UI for that here below. */}
      {imagePreview && (
        <div className='max-w-3xl mx-auto mb-3 flex items-center'>
        {/* step672: make it relative class so that the cross button can be positioned with respect to the image here below. */}
        <div className='relative'>
          <img
            src={imagePreview}
            alt='Image_preview'
            className='w-20 h-20 object-cover rounded-lg border border-slate-700'
          />
          {/* step673: now lets make the cross button to remove the image here below. */}
          <button
            onClick={removeImage}
            className='absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700'
            type='button'
          >

            {/* step674: lets display the X icon using "lucide-react" here below. */}
            <XIcon className='w-4 h-4' />
          </button>
          </div>
          </div>
      )}

      {/* step675: now lets create the form here below. */}
      <form onSubmit={handleSendMessage} className='max-w-3xl mx-auto flex space-x-4'>
        <input type="text"
        // step676: the value of the input will be the text state here below.
          value={text}  
          // step677: on changing the input tag , we can run the function here below ; to update the text state with that here below.
          onChange={(e) => {
            setText(e.target.value)
            // step678: also now if the sound is enabled , we will play the sound here below for typing , as the values of input tag are being changed i.e. as we type in the chat input field.
            isSoundEnabled && playRandomKeyStrokeSound()
          }}
          className='flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 px-4'
          placeholder='Type your message...'
        />

        {/* step679: now we can make the file input tag here below , which will be hidden by default and runs only when the user wants to upload an image. */}
        <input
          type='file'
          accept='image/*'
          onChange={handleImageChange}
          ref={fileInputRef}
          className='hidden'
        />

        {/* step680: so now lets paste the button which will allow the user to upload an image here below and will click on the input tag of type file which is hidden there and will be clicked only when this button is clicked here below ; thats why we have ref hook to target that file input tag and once this button is clicked it will indirectly click that hidden file input tag and trigger the onChange event there. */}
        <button
         type='button'
         onClick={() => fileInputRef.current?.click()}
         className={`bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg px-4 
          transition-colors ${
            imagePreview ? "text-cyan-500" : ""
          
        }`}
        >
          {/* step681: show the image icon using lucide react here below. */}
          <ImageIcon className='w-5 h-5' />
        </button>
        {/* step682: now make the submit button to submit the form and send the message. */}
        <button
          type='submit'
          // step683: keep it disabled if the user has not entered a text nor selected an image here below.

          // step684: see the next steps in useChatStore.js file now there.
          disabled={!text && !imagePreview}
          className='bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg px-4 py-2 font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
        >
          <SendIcon className='w-5 h-5' />
        </button>
      </form>
    </div>
  )
}

export default MessageInput
