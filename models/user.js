import mongoose from "mongoose";
import { boolean } from "webidl-conversions";

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    phone:{
        type:Number,
    },
    userRole: {
        type: String,
        enum: ['Organiser', 'Coordinator', 'Crew'],
    },
    verified:{
        type:Boolean,
        default:false
    },
    userProfile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userRole"
    }
})

const User = mongoose.model("User",userSchema);

export default User;