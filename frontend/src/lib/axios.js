// step329: lets import axios now.
import axios from "axios";

// step330: now create an instance for the axios here below and export it , so that it can be used in other files now there using import.

// step331: we will be now using this whenever we make a request.
export const axiosInstance = axios.create({

    // step332: so when we are in development , we will be sending fetch request using AXIOS to the backend on our localhost backend server ; else send it to the domain of production followed by /api endpoint there when in production ; so : If in production → use "/api" (relative path on your deployed domain).

    // step333: import.meta.env.MODE → in Vite projects, this gives the current environment.

    // step334: so now if we do : axiosInstance.get("/users") : In dev → request goes to http://localhost:3000/api/users & In production → request goes to https://yourdomain.com/api/users.

    // step335: here : No need for process.env.DOMAIN_URL : because we have the frontend and backend deployed at same domain in prduction , so the frontend base url is already here by "/" we just make it point to "/api" at end i.e it will be : https://yourdomain.com/api  automatically.
    baseURL : import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api",

    // step336: when we send request , we also must handle the authentication ; so we will have to send cookies too when sending request to the backend ; so the below code will send the cookies with the request too to the backend.
    withCredentials : true

    // step337: see the next steps in step338.txt file there.
})