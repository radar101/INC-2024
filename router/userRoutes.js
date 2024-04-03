import express from "express";
const userRouter = express.Router();
import Authentication from '../middlewares/authenticate.js'
import {
    userResister,
    userLogin,
    userLogout,
    getUser,
    userProfileUpdate,
    uploadProfilePicture,
    createDocument
} from '../controllers/user-controller.js';
import uploadMiddleware from  "../middlewares/uploadImageMiddleware.js";
import { upload } from "../middlewares/multers3.js";




userRouter.post('/register', userResister);


userRouter.post('/login', userLogin);

userRouter.put('/updateprofile', Authentication, userProfileUpdate);

userRouter.get('/logout', Authentication, userLogout);

userRouter.get('/getuser', Authentication, getUser);

userRouter.post('/uploadprofilepic',Authentication,uploadMiddleware.single("profilepic"),uploadProfilePicture);

userRouter.post("/upload", upload, createDocument)
export default userRouter