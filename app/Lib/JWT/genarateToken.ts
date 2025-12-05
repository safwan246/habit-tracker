import jwt from "jsonwebtoken";

export const generateToken = (user_id:string)=>{

    return jwt.sign({user_id}, process.env.JWT_SECRET!,{
        expiresIn:"4d"
    })
}