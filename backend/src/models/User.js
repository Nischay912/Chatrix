// step74: we must name it with capital letter to make it visible outside of this file ; so convention says to create models named with capital starting letters always.

// step75: so we created this model to communicate with the users of the database here.
import mongoose from "mongoose";

// step76: lets vreate a schema now for our database.
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    profilePic:{
        type: String,
        // step77: keep it empty string for profile pic initially when user signs up initially.
        default: ""
    },
    },

    // step78: can add this line below to also store the last login time or signup time logout time , createdAt , updatedAt , lastLogin time , etc.
    { timestamps: true }
);

// step79: now lets create a model now from the schema we created above ; so that every user has the same schema to be used in the database.

// using the below code , mongoose creates collection "users" which is plural of what was written in lowercase below "User" ; and this model is what we use to work with the "users" collection in the database.
const User = mongoose.model("User", userSchema);

// step80: finally export the model now ; so using this model we can interact with all the users in the database.

// step81: see next steps in auth.controller.js file now there.
export default User