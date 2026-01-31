// step500: start off by writing rfce below and doing some important imports here below.
import React, { use } from 'react'
import { useState , useRef } from 'react'
import { LogOutIcon , VolumeOffIcon , Volume2Icon, Volume , LoaderIcon} from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore.js'
import { useChatStore } from '../store/useChatStore.js'

// step533: now lets create a variable which will be using the audio element to play the sound here below.
const mouseClickSound = new Audio("/sounds/mouse-click.mp3")

function ProfileHeader() {

  // step501: lets now import the needed states from the useAuthStore and useChatStore hooks here below.
  const { logout , authUser , updateProfile , isUpdatingProfile} = useAuthStore()
  const {isSoundEnabled , toggleSound} = useChatStore()

  // step502: also now lets create a state using useState to check if the user has a selected image or not ; intially it will be "null"
  const [selectedImg , setSelectedImg] = useState(null)

  // step503: also now lets use the useRef to get the input file here below ; intial value will be "null"
  const fileInputRef = useRef(null)
  
  // step504: now lets create a function to upload the image selection here below.

  // step534: now this function will run when we try to upload any file for image in the file type input tag there.
  const handleImageUpload = (e) => {
    // step535: now lets try to get the selected file using the event object here below.

    // step536: its a array as user can select multiple files too , but we will be selecting only the 1st one i.e. the one at 0th index here below.
    const file = e.target.files[0]

    // step537: if the file is not selected somehow , then we just return back.
    if(!file) return;

    // JPG only validation if needed
  if (file.type !== "image/jpeg") {
    alert("Only JPG images are allowed");
    return;
  }

    // step538: else we can use a javascript api named "FileReader" that helps us to read the files selected from an <input type="file">.
    const reader = new FileReader();
    // step539: then we can use the readAsDataURL method to read the file here below.

    // step540: This method tells the FileReader to read the content of the file and convert it into a Base64-encoded string.
    reader.readAsDataURL(file)

    // step541: finally when the image is loaded , we will run the callback function here below.
    reader.onload = async() =>{
      // step542: Base64 is a way to represent binary data (like images) as a long string of text ; Because we used readAsDataURL(file), this will be a Base64-encoded string representing the image ; So this line takes the file that was read and stores it in base64Image.
      const base64Image = reader.result

      // step543: finally update the state containing the image which we have used in the img tag too there below.

      // step544: now see the next steps in useAuthStore.js file there now.
      setSelectedImg(base64Image)

      // step550: now lets call the update profile method here below ; with the data as the profile pic url we got above in the variable named "base64Image" above there.

      // step551: now we will be able to see the image on the profile page there and even on refreshing it won't go as it has been saved on cloudinary ; we can see it there on cloudinary website under "assets" option there ; we can also see it now updated in the database there too with the cloudinary url as the profile pic url there too.

      // step552: see the next steps in useAuthStore.js file there now.
      await updateProfile({profilePic:base64Image})
    }
  }

  return (
    // step505: lets have a bottom border here below.
    <div className='p-6 border-b border-slate-700/50'>
      {/* step506: lets have a flex container here below with space in between the profile pics and other things. */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
          {/* step507: now lets make the avatar and the online status to be shown on top right when user is online or not there. */}

          {/* step508: we are using the classes from daisyUI here below > which we can check by going on daisyui.com > version 4 select that we are using and installed > select components > search for avatar and go scrolling below till "avatar with presence indicator" to see the classes we are using here below > can see the jsx code there too for it. */}
          <div className="avatar online">

            {/* step515: now lets make a button here which will make us to click on the file input tag indirectly here. */}
            <button className='size-14 rounded-full overflow-hidden relative group'
              // step516: lets make it to click the file input tag by selecting it using the ref and using the .click to click on it inidrectly here ; click : It programmatically simulates a mouse click on that element.

              // step517: now if we go on the place where the input was , there will come a hand to click on button and we can click to open file upload there , but the actual "choose file" option will be hidden there , to make the UI look good there.
              onClick={() => fileInputRef.current.click()}

            >
              {/* step518: now lets make the profile icon here below which will act as the button to open file choosing input tag here below. */}

              {/* step519: if selectedImg exists i.e. the user just uploaded/selected an image , then use it ; Else, if not, but authUser.profilePic exists → use the user’s profile picture ; Else, if both are missing → use the default image "/avatar.png". */}
              <img src={selectedImg || authUser.profilePic || "/avatar.png"} alt="User Image" 

              // step520: use "size-full" i.e. width 100% to make the image stretch to fill its container ; and the object cover when used makes : The image keeps its aspect ratio & Parts of the image may get cropped to fill the space.
                className='size-full object-cover'  
              />

              {/* step557: now lets make a loader to be shown when we are updating the profile image there. */}

              {/* step558: see the next steps now in ActiveTabSwitch.jsx file there now. */}
              {isUpdatingProfile && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                  <LoaderIcon className="size-6 animate-spin text-cyan-500" />
                </div>
              )}

              {/* step521: now lets make a "change" text to be shown over the image when we hover over it , telling the user that we can change the image , if they click on it */}

              {/* step522:
                This <div> acts as a dark overlay with the text "Change" that appears when we hover over the profile image.

                - absolute → Positions this div absolutely inside the parent (the avatar button).
                - inset-0 → Stretches the overlay to cover the entire parent (top:0, right:0, bottom:0, left:0).
                - bg-black/50 → Semi-transparent black background (50% opacity).
                - opacity-0 → Initially invisible (fully transparent).
                - group-hover:opacity-100 → When the parent (with class "group") is hovered, make this fully visible.
                - flex items-center justify-center → Center the text both vertically and horizontally inside the overlay.
                - transition-opacity → Smooth fade effect when changing opacity.

                Inside it:
                - <span className='text-white text-xs'> → White, small-sized text saying "Change".
              */} 
              <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity'>
                <span className='text-white text-xs'>Change</span>
              </div>

            </button>

            {/* step509: now lets make it an input tag actually so that we can click on it to select the image and upload it here below. */}

            {/* step510: keep the type as "file" so that user can select the image there from files of the laptop ; keep the type as "file" so that : Makes the input a file upload field. */}
            <input type="file" 

            // step511: it will accpet only files starting with "image/*" so that only images can be selected there.
              // accept='image/*' 
              accept = ".jpg, .jpeg, image/jpeg"

              // step512: now lets have a refernce made to point to the input file here below.
              ref={fileInputRef}        
              
              // step513: also it will run this function below when we change the value of input file.
              onChange={handleImageUpload}

              // step514: now we will also be giving a hidden class to this : else it will be showing "choose file" there in the app , which will look very ugly so we will keep it there in UI , but keep it hidden there ; we will rather have the profile icon there ; and behind the scenes when we click on the avatar , we will be clicking to this input to choose file there.
              className='hidden'
            />
          </div>
          {/* step523: now we can mae a div for username and online text showing there. */}
          <div>
            {/* step524: truncate ensures that if the user’s name or text is too long to fit within max-w-[180px], it will not break the layout but instead show an ellipsis (...). */}
            <h3 className='text-slate-200 font-medium text-base max-w-[180px] truncate'>
              {authUser.fullName}
            </h3>
            <p className='text-slate-400 text-xs'>Online</p>
          </div>
          </div>

          {/* step525: now lets make the buttons here below. */}
          <div className="flex gap-4 items-center">
                {/* step526: lets make the the logout button first here. */}
                <button
                  // step527: transition-colors will make the color change smoothly when we hover over it : Whenever a color property (like text color, background color, border color, etc.) changes, animate it smoothly instead of snapping instantly.
                  className='text-slate-400 hover-text-slate-200 transition-colors'
                  onClick={logout}
                >
                  <LogOutIcon className="size-5" />
                </button>

                {/* step528:now lets make the sound toggle button here. */}
                <button
                  className='text-slate-400 hover:text-slate-200 transition-colors'
                  onClick={() =>{

                    // step529: the below code : Ensures the sound plays fresh every time (instead of continuing from middle).
                    mouseClickSound.currenTime=0;

                    // step530: .play() starts playing the click sound ; if playing fails (maybe browser blocked autoplay, or file missing), it logs the error instead of crashing the app.
                    mouseClickSound.play().catch((error) => console.log("Audio play failed: " , error));

                    // step531: This function flips the app’s sound state (on → off, or off → on).
                    toggleSound();
                  }}
                >
                
                {/* step532: now if the sound is enabled , show the volume on icon , else show the volume off icon */}
                {isSoundEnabled ? (
                  <Volume2Icon className="size-5" />
                ) : (
                  <VolumeOffIcon className="size-5" />
                )}

                </button>
          </div>
        </div>
    </div>
  )
}

export default ProfileHeader

