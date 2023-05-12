import express from "express"
import { generateOtp, registerVerifyOtp, signUp, userProfile } from "../controllers/user.js"
const router = express.Router()

router.post("/generate-otp",generateOtp) // http://localhost:5000/api/v1/user/generate-otp 
router.post("/verify-otp",registerVerifyOtp) // http://localhost:5000/api/v1/user/verify-otp
router.post("/signup",signUp) //  http://localhost:5000/api/v1/user/signup
// router.post("/add-userprofile",userProfile)


export default router;