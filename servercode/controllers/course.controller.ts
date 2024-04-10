import { Request,Response,NextFunction, response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary"; 
import ejs from "ejs";
import path from "path";
import { createCourse, getAllCoursesService } from "../services/course.service";
import CourseModel from "../models/course.model";
import sendMail from "../utils/sendMail";
import axios from 'axios';


export const uploadCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        // Create the course
        createCourse(data, res, async (course) => {
            console.log(data, "data from create event");
            // Add any additional logic here if needed
        });
    } catch (error) {
        // Handle errors
        console.error('Error in uploadCourse:', error);
        res.status(500).json({ success: false, error: 'Failed to upload course' });
    }
});




//edit course
// export const editCourse= CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
//     try{
//         const data=req.body;
//         const courseId=req.params.id;
//         const course= await CourseModel.findByIdAndUpdate(
//             courseId,
//             {
//                 $set:data,
//             },
//             {new:true}
//         );
//     } catch(error:any){
//         return next(new ErrorHandler(error.message,500));
//     }
// })
export const editCourse = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;
        const courseId = req.params.id;

        // Validate and sanitize data if needed

        // Ensure only allowed fields are included in data
        const allowedFields = ['name', 'description', 'price', 'estimatedPrice', 'tags', 'level', 'demoUrl', 'prerequisites', 'ratings', 'purchased'];
        const newData = Object.keys(data)
            .filter(key => allowedFields.includes(key))
            .reduce((obj:any, key:any) => {
                obj[key] = data[key];
                return obj;
            }, {});

        // Update the course
        const course = await CourseModel.findByIdAndUpdate(courseId, newData, { new: true });
        // console.log(course?.price)
        // Handle case where course is not found
        if (!course) {
            return next(new ErrorHandler('Course not found', 404));
        }

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
});

//get course content only for valid user
// export const getCourseByUser = CatchAsyncError(async(req:Request,res:Response,next:NextFunction)=>{
//     try{
//         const userCourseList=req.body?.courses;
//         const courseId=req.params.id;
//         console.log("req:",req)
//         const courseExists=userCourseList?.find(
//             (course:any)=>course._id.toString()===courseId
//         );
//         // if(!courseExists){
//         //     return next(
//         //         new ErrorHandler("you are not eligible to access this course",404)
//         //     )
//         // }
        
//         const course=await CourseModel.findById(courseId);
//         const content=course?.courseData;
//         console.log(content)
       
//         res.status(200).json({
//             success:true,
//             content,
//         })
//     }
//     catch(error:any){
//         return next (new ErrorHandler(error.message,500))
        
//     }});

//get all course --only for admins
export const getAllCourses = CatchAsyncError(
    async(req:Request,res:Response,next:NextFunction)=>{
        try{
            getAllCoursesService(res);
        }catch(error:any){
            return next(new ErrorHandler(error.message,400));
        }
    }
)

//Delete course --only for admin

export const deleteCourse=CatchAsyncError(
    async(req:Request,res:Response,next:NextFunction)=>{
        try{
            const {id}=req.params;
            const course = await CourseModel.findById(id);
            if(!course){
                return next(new ErrorHandler("course not found",400))
            }
            await course.deleteOne({id});

            res.status(200).json({
                success:true,
                message:"course deleted successfully",
            });
        }catch(error:any){
            return next(new ErrorHandler(error.message,400));
        }
    }
)