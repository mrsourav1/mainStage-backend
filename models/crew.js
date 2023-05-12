import mongoose from "mongoose";

const crewSchema = mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    image:String,
    gender:{
        type: String,
        enum: ['male', 'female', 'prefer not to say'],
    },
    DOB:{
        type:Date
    },
    aadharNumber:{
        type:String
    },
    languages:[{}],
    location:{
        type:String
    }
})

const Crew = mongoose.model("Crew",crewSchema)
export default Crew;