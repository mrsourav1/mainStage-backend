import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    userRole: {
        type: String,
        enum: ['Organiser', 'Coordinator', 'Crew'],
        required: true
    },
    userProfile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userRole"
    }
    // userProfile:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Organiser"
    // },
    // userProfile:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Crew"
    // },
    // userProfile:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:"Coordinator"
    // }    

})

const User = mongoose.model("User",userSchema);

export default User;