import Coordinator from "../models/coordinator.js";
import Crew from "../models/crew.js";
import Organiser from "../models/organiser.js";
import User from "../models/user.js";
import otpGenerator from "otp-generator"


const otpStorage = {};
export const generateOtp = async (req,res)=>{
    const {phone} = req.body;
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });
    console.log("otp",otp)
    otpStorage[phone] = otp;
    res.json({ message: 'OTP generated and sent successfully' });

}

export const registerVerifyOtp = async(req,res)=>{
    const { phone, otp } = req.body;
    const already = await User.findOne({ phone: phone });
    if (already) {
        return res.status(400).json({message:"Phone Number already registered"})
    }
    const storedOTP = otpStorage[phone];
    if (!storedOTP) {
      return res.status(400).json({ error: 'Invalid or expired OTP Please try again' });
    } else if (otp === storedOTP) {
      delete otpStorage[phone];
      const response = new User({
        phone:phone,
        verified:true
      })
      await response.save()
      return res.status(200).json({ message: 'OTP verification successful' });
    } else {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
}

// export const signUp = async (req, res) => {
//     const { phone, firstName, lastName, userRole } = req.body;
//     const user = await User.findOne({ phone });
//     if (!user) {
//       return res.status(400).json({ message: "This number is not verified" });
//     }
  
//     user.firstName = firstName;
//     user.lastName = lastName;
//     user.userRole = userRole;
//     const response = await user.save();
//     return res.status(200).json(response);
// };

export const signUp = async (req, res) => {
    const { phone, firstName, lastName, userRole } = req.body;
    const user = await User.findOne({ phone });
  
    if (!user) {
      return res.status(400).json({ message: "This number is not verified" });
    }
  
    user.firstName = firstName;
    user.lastName = lastName;
    user.userRole = userRole;
  
    let userProfile;
  
    if (userRole === "Crew") {
      const crewProfile = new Crew({ user: user._id });
      userProfile = await crewProfile.save();
    } else if (userRole === "Coordinator") {
      const coordinatorProfile = new Coordinator({ user: user._id });
      userProfile = await coordinatorProfile.save();
    } else if (userRole === "Organiser") {
      const organiserProfile = new Organiser({ user: user._id });
      userProfile = await organiserProfile.save();
    }
  
    user.userProfile = userProfile._id;
    await user.save();
    return res.status(200).json(user);
  };
  

export const userProfile = async(req,res)=>{
    const {userid} = req.body
    const user = await User.findOne({_id:userid})
    console.log(user)
    if(user.userRole=="Crew"){
      try{
        console.log("this is body",req.body)
        const {gender,DOB,aadharNumber,location,image} =  req.body
        const userProfile = await Crew.findByIdAndUpdate(user.userProfile,{gender,DOB,aadharNumber,location,image:req.file.filename}, { new: true });
        console.log("this is userProfile",userProfile)
        return res.status(201).json(userProfile)
      }catch(err){
        res.status(500).json(err)
      }

    }else if(user.userRole=="Organiser"){
      try{
        const {companyName,companyLogo,companyEmail,alternateNumber} = req.body
        const userProfile = await Organiser.findByIdAndUpdate(user.userProfile,{companyName,companyLogo:req.file.filename,companyEmail,alternateNumber}, { new: true })
        return res.status(201).json(userProfile)
      }catch(err){
        return res.status(500).json(err)
      }

    }else if(user.userRole=="Coordinator"){
      try{
        const userProfile = await Coordinator.findByIdAndUpdate(user.userProfile, req.body, { new: true });
        return res.status(201).json(userProfile)
      }catch(err){
        return res.status(500).json(err)
      }
    }else{
      return res.status(500).json("InCorrect userRole")
    }
}
  

// {
// "userId":"645cde6613ca221fc515a052",
// "gender":"male",
// "DOB":"20/2/2000",
// "aadharNumber":"123452345",
// "location":"Delhi"
// }