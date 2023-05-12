import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    eventName:{
        type:String,
        required:true
    },
    eventPoster:{
        type:String,
        required:true
    },
    eventDescription:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    eventAddress:{
        type:String,
        required:true
    },
    eventDuration:{
        type:String,
        required:true
    },
    eventStartDate:{
        type:Date,
        required:true
    },
    eventEndDate:{
        type:Date,
        required:true
    },
    minprice:{
        type:Number,
        required:true
    },
    maxPrice:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    visibility:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Coordinator"
    }],
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Organiser"
    },
    appliedBy:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Crew"
    }]
})

const Event = mongoose.model("Event",eventSchema)
export default Event
