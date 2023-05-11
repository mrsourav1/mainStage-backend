import mongoose from "mongoose";

const coordinatorSchema = mongoose.Schema({
    location:{
        type:String,
        required:true
    },
    aadharNumber:{
        type:String,
        required:true
    },
    upiId:[],
    myTeam:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Crew"
    }],
})

const Coordinator = mongoose.model("Coordinator",coordinatorSchema)
export default Coordinator;