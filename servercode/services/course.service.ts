import { Response } from "express";
import CourseModel from "../models/course.model";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import axios from 'axios';
import ejs from 'ejs';
import sendMail from "../utils/sendMail";
import path from 'path'; 


//create course
export const createCourse = CatchAsyncError(async(data:any,res:Response)=>{
    const course=await CourseModel.create(data);
    
    res.status(201).json({
        success:true,
        course
    })
})
//create course and send mail
// export const createCourse = CatchAsyncError(async (data: any, res: Response) => {
//     const course = await CourseModel.create(data);
//     try {
        

//         // Make request to API endpoint to get all users using the access token
//         const usersResponse = await axios.get('http://localhost:8000/api/v1/get-all-users');

//         // Extract necessary data from the response
//         const userEmails = usersResponse.data.map((user: any) => user.email);

//         // Create the course
     
        
//         // Extract necessary data for email
//         const mailData = {
//             course: {
//                 _id: course._id.toString().slice(0, 6),
//                 name: course.name,
//                 // Add more fields as needed
//             }
//         };

//         // Render the HTML email template
//         const html = await ejs.renderFile(path.join(__dirname, '../mails/newEventCreated.ejs'), { course: mailData });

//         // Send email to each user
//         for (const email of userEmails) {
//             try {
//                 // Send email to the current user
//                 await sendMail({
//                     email,
//                     subject: 'New Course Created',
//                     template: 'newEventCreated.ejs',
//                     data: mailData,
//                     // Add more parameters as needed
//                 });
//             } catch (error: any) {
//                 // Log error if email sending fails
//                 console.error(`Failed to send email to ${email}: ${error.message}`);
//             }
//         }

//         // Send response with created course data
//         res.status(201).json({
//             success: true,
//             course
//         });
//     } catch (error: any) {
//         // Handle errors and send appropriate response
//         res.status(500).json({
//             success: false,
//             error: error.message
//         });
//     }
// });

//get all courses
export const getAllCoursesService=async(res:Response)=>{
    const courses=await CourseModel.find().sort({createdAt:-1});

    res.status(201).json({
        success:true,
        courses,
    })
}