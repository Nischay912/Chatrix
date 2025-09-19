// step638: now we will allow the app to play a random sound when we press a key when we are typing a message in the chat input field now there.

// step639: lets create an array of audios for different sounds of keystrokes , from which sounds will be picked randomly and played , so that like a original keyboard which plays different sounds for different key strokes , this will also play different sounds for different key strokes we press when typing a message in the chat input field now there.
const keyStrokeSounds = [
    new Audio("/sounds/keystroke1.mp3"),
    new Audio("/sounds/keystroke2.mp3"),
    new Audio("/sounds/keystroke3.mp3"),
    new Audio("/sounds/keystroke4.mp3")
];

// step640: now lets create our hook to select an audio from these randomly now here below.

// step643: see the next steps in MessageInput.jsx file now there.
function useKeyboardSound(){
    const playRandomKeyStrokeSound = () =>{
        // step641: now lets randomly select one of the audio's index from the array using Math.random() now here below.
        const randomSound = keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];

        // step642: now also we will set the currentTime of the audio to 0 so that it can be played from the beginning now here below ; so by the code below : You force the audio to restart from the beginning (0 seconds) each time it is triggered ; so now errors like : Continue from where it stopped last time, or Refuse to replay immediately if it has already finished ; won't come and it will always play the music fresh from start for every key pressed : every press starts fresh.
        randomSound.currentTime = 0

        // step643: and then lets play it and if we get some error , we can just console log it here below.
        randomSound.play().catch(error => console.log("Audio playing failed: ",error));
    }
    return {playRandomKeyStrokeSound}
}

export default useKeyboardSound