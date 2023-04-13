import User from "../models/user"
import bcrypt from "bcryptjs"
import { signUpSchema ,signInSchema} from "../schemas/auth"
import jwt from "jsonwebtoken"
export const signUp=async(req, res)=>{
 try {
     const {error} = signUpSchema.validate(req.body,{abortEarly:false})
     if(error){
        return res.status(401).json({
            message:error.details.map(err=>err.message)
        })
     }
    const {email, password} = req.body
    const checkMail = await User.findOne({email: email})
    if(checkMail){
        return res.status(402).json({
            message: "Email đã tồn tại"
        })
    }
    const passwordEncryption = await bcrypt.hash(req.body.password,10)
    const user = await User.create({
        name:req.body.name,
        email:req.body.email,
        password:passwordEncryption
    })
    if(user){
        return res.status(201).json({
            message:"Đăng ký thành công",
            user
        })
    }
 } catch (error) {
    return res.status(500).json({
        message:error
    })
 }
}
export const signIn=async(req, res)=>{
    try {
        const {error} = signInSchema.validate(req.body,{abortEarly:false})
        if(error){
           return res.status(401).json({
               message:error.details.map(err=>err.message)
           })
        }
       const {email, password} = req.body
       const user = await User.findOne({email: email})
       if(!user){
           return res.status(402).json({
               message: "Tài khoản ko tồn tại"
           })
       }
       const isMatch = await bcrypt.compare(password,user.password)
      if(!isMatch){
        return res.status(403).json({
            message: "Mật khẩu không đúng"
        })
      }
       const token = jwt.sign({id:user._id},"namdeptrai",{expiresIn:"6h"})
      return res.status(201).json({
        message:"Đăng nhập thành công",
        token,
        user
      })
    } catch (error) {
       return res.status(500).json({
           message:error
       })
    }
   }