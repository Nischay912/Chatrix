// Function component named UsersLoadingSkeleton
// This will render a "loading placeholder" (skeleton) when user data is not yet available
function UsersLoadingSkeleton() {
  return (
    // Outer <div> that wraps all skeleton cards
    // className="space-y-2" → Adds vertical spacing of 0.5rem between child elements
    <div className="space-y-2">

      {/* We create an array [1, 2, 3] and call .map() to loop 3 times
          → This makes 3 skeleton user cards appear
          "item" will be 1, 2, and 3 during each loop
      */}
      {[1, 2, 3].map((item) => (

        // Each skeleton card (for one fake user row)
        // key={item} → React requires a unique "key" when rendering lists
        // className explanation:
        //   - bg-slate-800/30 → background color (slate-800) with 30% opacity
        //   - p-4 → padding inside the card (1rem on all sides)
        //   - rounded-lg → large rounded corners
        //   - animate-pulse → Tailwind class that adds a pulsing animation effect
        <div key={item} className="bg-slate-800/30 p-4 rounded-lg animate-pulse">

          {/* Inner flexbox to arrange avatar + text placeholders horizontally */}
          <div className="flex items-center space-x-3">
            
            {/* Left side: circular avatar placeholder */}
            {/* className explanation:
                - w-12 h-12 → width and height = 3rem (48px)
                - bg-slate-700 → solid gray background
                - rounded-full → makes it a perfect circle
            */}
            <div className="w-12 h-12 bg-slate-700 rounded-full"></div>

            {/* Right side: fake text lines stacked vertically */}
            {/* flex-1 → takes up remaining horizontal space */}
            <div className="flex-1">

              {/* First fake text line (like a name) */}
              {/* className explanation:
                  - h-4 → height = 1rem
                  - bg-slate-700 → solid gray background
                  - rounded → slightly rounded corners (pill look)
                  - w-3/4 → width is 75% of container
                  - mb-2 → margin-bottom = 0.5rem (adds spacing below)
              */}
              <div className="h-4 bg-slate-700 rounded w-3/4 mb-2"></div>

              {/* Second fake text line (like a subtitle/status) */}
              {/* className explanation:
                  - h-3 → height = 0.75rem
                  - bg-slate-700/70 → gray with 70% opacity (lighter)
                  - rounded → slightly rounded corners
                  - w-1/2 → width is 50% of container
              */}
              <div className="h-3 bg-slate-700/70 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Export this component so it can be imported/used in other files
export default UsersLoadingSkeleton;
