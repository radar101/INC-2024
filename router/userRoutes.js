import express from "express";
const userRouter = express.Router();
import Authentication from '../middlewares/authenticate.js'
import {
    userResister,
    userLogin,
    userLogout,
    getUser,
    userProfileUpdate,
    uploadProfilePicture
} from '../controllers/user-controller.js';
import uploadMiddleware from  "../middlewares/uploadImageMiddleware.js";




userRouter.post('/register', userResister);


userRouter.post('/login', userLogin);

userRouter.put('/updateprofile', Authentication, userProfileUpdate);

userRouter.get('/logout', Authentication, userLogout);

userRouter.get('/getuser', Authentication, getUser);

userRouter.post('/uploadprofilepic',Authentication,uploadMiddleware.single("profilepic"),uploadProfilePicture);

export default userRouter