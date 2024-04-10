import { Response } from "express";
import userModel from "../models/user.model"
import { createDecipheriv } from "crypto";

//get user by id
export const getUserById=async(id:string,res:Response)=>{
    const user=await userModel.findById(id);
    res.status(201).json({
        success:true,
        user,
    })
}

//get all user
export const getAllUsersService=async(res:Response)=>{
    const users=await userModel.find().sort({createdAt:-1});

    res.status(201).json({
        success:true,
        users,
    })
}