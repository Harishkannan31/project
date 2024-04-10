import express from 'express';
import { deleteCourse, editCourse, getAllCourses, uploadCourse} from '../controllers/course.controller';
import { authorizeRoles,isAuthenticated } from '../middleware/auth';
const courseRouter=express.Router();

courseRouter.post("/create-course",isAuthenticated,authorizeRoles("admin"),uploadCourse)
courseRouter.put("/edit-course/:id",isAuthenticated,authorizeRoles("admin"),editCourse)
// courseRouter.get("/get-valid-course/:id",isAuthenticated,getCourseByUser)
courseRouter.get("/get-all-courses",isAuthenticated,getAllCourses)
courseRouter.delete("/delete-course/:id",isAuthenticated,authorizeRoles("admin"),deleteCourse)


export default courseRouter;