import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { activateUser, getAllUsers, getUserInfo, registrationUser, socialAuth } from '../controllers/user.controller';
import { loginUser,logoutUser,updateAccessToken } from '../controllers/user.controller';
const userRouter=express.Router();
import { authorizeRoles, isAuthenticated } from '../middleware/auth';

userRouter.post('/registration',registrationUser);
userRouter.post('/activate-user',activateUser);
userRouter.post('/login',loginUser);
userRouter.get('/logout',isAuthenticated,logoutUser);
userRouter.get('/refresh',updateAccessToken);
userRouter.get('/me',isAuthenticated,getUserInfo);
userRouter.post('/social-auth',socialAuth);
userRouter.get('/get-all-users',isAuthenticated,authorizeRoles("admin"),getAllUsers);
export default userRouter;