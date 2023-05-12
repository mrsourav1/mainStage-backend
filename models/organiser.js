import mongoose, { mongo } from "mongoose";

const organiserSchema = mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    companyName:{
        type:String
    },
    companyLogo:{
        type:String
    },
    companyEmail:{
        type:String
    },
    alternateNumber:{
        type:Number,
    },
    eventPosted:{

    },
    positionPosted:{

    }

})

const Organiser = mongoose.model("Organiser",organiserSchema)

export default Organiser