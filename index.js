import express from 'express'
import cors from 'cors';
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import { connect } from "./connection/connect.js"

dotenv.config();
const app = express()
// const port = 5000;
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy:"cross-origin" }));
app.use(morgan("common"))
app.use(cors())


app.get("/",(req,res)=>{
    res.send("This is working")
})

const start = async()=>{
    try{
        await connect()
        app.listen(process.env.PORT,()=>{
            console.log(`i am available at ${process.env.PORT}`)
        })
    }catch(err){
        console.log(err)
    }
}

start()