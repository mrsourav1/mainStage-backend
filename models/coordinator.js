import mongoose from "mongoose";

const coordinatorSchema = mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    location:{
        type:String
    },
    aadharNumber:{
        type:String
    },
    upiId:[],
    myTeam:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Crew"
    }],
})

const Coordinator = mongoose.model("Coordinator",coordinatorSchema)
export default Coordinator;