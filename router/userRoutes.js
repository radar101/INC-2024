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
    //getString,
    //setString,
    readIpRecord,
    addIpRecord,
} from '../controllers/user-controller.js';
import uploadMiddleware from  "../middlewares/uploadImageMiddleware.js";



userRouter.post('/register', userResister);


userRouter.post('/login', userLogin);

userRouter.put('/updateprofile', Authentication, userProfileUpdate);

userRouter.get('/logout', Authentication, userLogout);

userRouter.get('/getuser', Authentication, getUser);

userRouter.post('/uploadprofilepic',Authentication,uploadMiddleware.single("profilepic"),uploadProfilePicture);
// userRouter.get("/getString", getString);
// userRouter.get("/setString", setString);
userRouter.get("/getRecord", readIpRecord);
userRouter.get("/setRecord", addIpRecord);
export default userRouter