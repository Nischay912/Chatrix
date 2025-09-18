// Define a new React functional component called MessagesLoadingSkeleton ; which will show a dummy messages type looking skeleton when the messages are loading in the chat page conatiner thus there.

// A functional component is just a JavaScript function that returns JSX (HTML-like syntax for React)
function MessagesLoadingSkeleton() {
  
  // The component must return JSX, which describes what should appear on the screen
  return (
    
    // Outer container div that holds all the skeleton chat messages
    // Tailwind classes:
    // - max-w-3xl: sets the maximum width of this div to "3xl" size (~768px)
    // - mx-auto: automatically adds horizontal margins, centering the div on the page
    // - space-y-6: adds vertical spacing of 6 units between each child element inside this div
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* 
        Create an array of 6 empty slots using [...Array(6)].
        - Array(6) creates an array with 6 empty slots: [ , , , , , ]
        - The spread operator (...) turns it into a real array we can map over.
        - .map() is used to loop through each element and render JSX for it.
        - (_, index) => ...: '_' is a placeholder for the element itself (we don’t need it), 'index' is the position (0 to 5)
      */}
      {[...Array(6)].map((_, index) => (
        
        // Each chat message container div
        // React requires a unique 'key' prop when rendering lists to track each element efficiently
        // Tailwind + custom classes:
        // - chat: base style for chat container (comes from your chat CSS)
        // - chat-start: aligns the bubble to the left
        // - chat-end: aligns the bubble to the right
        // - index % 2 === 0 ? "chat-start" : "chat-end": alternates alignment for each message
        // - animate-pulse: applies a smooth pulsing animation to simulate loading
        <div
          key={index}
          className={`chat ${index % 2 === 0 ? "chat-start" : "chat-end"} animate-pulse`}
        >
          
          {/* 
            The actual chat bubble that represents a message
            - chat-bubble: adds padding, rounded corners, and default chat bubble style
            - bg-slate-800: sets the background color to dark gray
            - text-white: sets the text color to white (though here we have no text yet)
            - w-32: fixed width of the bubble (~8rem)
            - This div is intentionally left empty because it is a "loading skeleton" showing the shape only
          */}
          <div className={`chat-bubble bg-slate-800 text-white w-32`}></div>
        </div>
      ))}
    </div>
  );
}

// Export this component so it can be imported and used in other files
// Without exporting, this component cannot be used outside this file
export default MessagesLoadingSkeleton;
