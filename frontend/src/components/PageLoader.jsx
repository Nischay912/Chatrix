// step385: now lets write rfce and start building this component here below.
import React from 'react'

// step388: lets import the loader icon now here below.
import { LoaderIcon } from 'lucide-react'

// step386: now in this page , we will be using a loading icon , so let sgo in cd frontend > npm i lucide-react : which provides hundreds of customizable SVG icons you can directly use as React components.

function PageLoader() {
  return (

    // step387: lets make it to take entire screen's height and contents of this div becomes centred in middle of the screen.
    <div className='flex items-center justify-center h-screen'>
      
      {/* step389: lets use the loader icon now here below with some size and spin animation.*/}

      {/* step390: will see this for couple of seconds when refreshing the login page : to see it there completely for now : go in App.jsx and make the condition if(true) return <PageLoader /> ; later set it back to what it was earlier there. */}

      {/* step391: see the next steps in SignUpPage.jsx file there now. */}
      <LoaderIcon className='size-10 animate-spin text-cyan-500' /> 
    </div>
  )
}

export default PageLoader
