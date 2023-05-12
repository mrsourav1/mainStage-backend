import express from 'express'
import cors from 'cors';
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { GridFsStorage } from "multer-gridfs-storage";
import { connect } from "./connection/connect.js";
import userRoute from "./routes/user.js"
import { userProfile } from './controllers/user.js';
import multer from 'multer';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy:"cross-origin" }));
app.use(morgan("common"))
app.use(cors())
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const originalName = file.originalname;
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            const filename = uniqueSuffix + '-' + originalName;
            const fileInfo = {
                filename: filename,
                bucketName: "file1"
            };
            resolve(fileInfo);
        });
    }
  });


const upload = multer({
storage
});
  
  //creating bucket
let bucket;
mongoose.connection.on("connected", () => {
    var client = mongoose.connections[0].client;
    var db = mongoose.connections[0].db;
    bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: "file1"
    });
    //console.log(bucket);
});

app.post("/api/v1/user/add-userprofile",upload.single("file"),userProfile)  // http://localhost:5000/api/v1/user/add-userprofile
app.get("/api/v1/user/:filename", async (req, res) => {
    const file = await bucket
          .find({
              filename: req.params.filename
          })
  
      bucket.openDownloadStreamByName(req.params.filename)
          .pipe(res);
  });

app.get("/",(req,res)=>{
    res.send("This is working")
})

app.use("/api/v1/user",userRoute)
// app.post("/verify-otp",registerVerifyOtp)
// app.post("/signup",signUp)


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