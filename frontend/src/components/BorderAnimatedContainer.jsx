// step410: can refer this website "https://cruip.com/animated-gradient-borders-with-tailwind-css/" for codes of how to implement it in our code here below.

// step411: so first put the @property code form ther in our index.css file and paste the code of theme in the tailwind.config.js file now there.

// step412: then get the source code for the main UI of the border from the website above and paste it here below.

// step413: then see the next steps in SignUpPage.jsx file now there ; and we have used {children} here below , so that this gets applied to all the children of the BorderAnimatedContainer component like children are all the elements inside the BorderAnimatedContainer component written wherever this is imported and used at any place in the app.

// step414: see next steps in SignUpPage.jsx file now there.
function BorderAnimatedContainer({children}) {
    return (
        <div className="w-full h-full [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/.48)_80%,_theme(colors.cyan.500)_86%,_theme(colors.cyan.300)_90%,_theme(colors.cyan.500)_94%,_theme(colors.slate.600/.48))_border-box] rounded-2xl border border-transparent animate-border  flex overflow-hidden">
            {children}
        </div>
    )
}

export default BorderAnimatedContainer