import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullName: {
        type : String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePics: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    college: {
        type: String,
        default: ""
    },
    fieldOfStudy: {
        type: String,
        default: ""
    },
    isOnboarded: {
        type: Boolean,
        default: false
    },
    friends:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, {timestamps:true});

// Password hashing (pre hook)
userSchema.pre("save", async function (next) {
    if(!this.isModified("password"))    return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.matchPassword = async function (enterPassword) {
    const isPasswordCorrect = await bcrypt.compare(enterPassword, this.password);
    return isPasswordCorrect;
}

const User = mongoose.model("User", userSchema);

export default User;