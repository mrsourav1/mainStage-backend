import mongoose from "mongoose";

// const uri = "mongodb+srv://main:main@cluster0.wtoxatu.mongodb.net/?retryWrites=true&w=majority";

export const connect = ()=>{
    mongoose.set('strictQuery',false)
    
    return mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("Db is Connected")
    })
}
