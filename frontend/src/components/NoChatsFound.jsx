// Importing an icon (chat bubble shape) from lucide-react
import { MessageCircleIcon } from "lucide-react";

// Import the chat store (state management hook) to access chat-related states and functions
import { useChatStore } from "../store/useChatStore";

// Function component NoChatsFound
// This UI is shown when there are no chats available for the user
function NoChatsFound() {
  // Extract the "setActiveTab" function from the chat store
  // setActiveTab lets us switch between tabs (like "chats" or "contacts")
  const { setActiveTab } = useChatStore();

  return (
    // Outer wrapper div
    // flex flex-col → vertical stacking of children
    // items-center justify-center → centers content horizontally and vertically
    // py-10 → vertical padding (2.5rem top and bottom)
    // text-center → centers text inside
    // space-y-4 → adds vertical spacing (1rem) between children
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">

      {/* Icon container (round background behind the chat icon) */}
      {/* w-16 h-16 → square of 4rem
          bg-cyan-500/10 → light cyan background with 10% opacity
          rounded-full → makes the square into a perfect circle
          flex items-center justify-center → centers the icon inside */}
      <div className="w-16 h-16 bg-cyan-500/10 rounded-full flex items-center justify-center">
        {/* The actual chat bubble icon inside the circle */}
        {/* w-8 h-8 → icon size = 2rem
            text-cyan-400 → cyan colored icon */}
        <MessageCircleIcon className="w-8 h-8 text-cyan-400" />
      </div>

      {/* Text section under the icon */}
      <div>
        {/* Heading: main message */}
        {/* text-slate-200 → light gray text
            font-medium → medium weight font
            mb-1 → margin bottom = 0.25rem */}
        <h4 className="text-slate-200 font-medium mb-1">No conversations yet</h4>

        {/* Subtext: description/instructions */}
        {/* text-slate-400 → darker gray text
            text-sm → small font size
            px-6 → horizontal padding so text doesn’t touch edges */}
        <p className="text-slate-400 text-sm px-6">
          Start a new chat by selecting a contact from the contacts tab
        </p>
      </div>

      {/* Button to go to "Contacts" tab */}
      {/* onClick → calls setActiveTab("contacts"), switching the UI to the contacts tab */}
      {/* className explanation:
          - px-4 py-2 → padding (1rem x, 0.5rem y)
          - text-sm → small font size
          - text-cyan-400 → cyan text
          - bg-cyan-500/10 → light cyan background with 10% opacity
          - rounded-lg → rounded corners
          - hover:bg-cyan-500/20 → background gets darker cyan on hover
          - transition-colors → smooth color transition on hover */}
      <button
        onClick={() => setActiveTab("contacts")}
        className="px-4 py-2 text-sm text-cyan-400 bg-cyan-500/10 rounded-lg hover:bg-cyan-500/20 transition-colors"
      >
        Find contacts
      </button>
    </div>
  );
}

// Export the component so it can be used elsewhere in the app
export default NoChatsFound;
