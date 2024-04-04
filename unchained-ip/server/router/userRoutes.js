const express = require("express");
const userRouter = express.Router();
const Authentication = require('../middlewares/authenticate.js');
const {
    userResister,
    userLogin,
    userLogout,
    getUser,
    userProfileUpdate,
    uploadProfilePicture,
    createIpDocument,
    readIpDocument
} = require('../controllers/user-controller.js');
const uploadMiddleware = require("../middlewares/uploadImageMiddleware.js");
const { uploadDocs } = require("../middlewares/multers3.js");


userRouter.post('/register', userResister);

userRouter.post('/login', userLogin);

userRouter.put('/updateprofile', Authentication, userProfileUpdate);

userRouter.get('/logout', Authentication, userLogout);

userRouter.get('/getuser', Authentication, getUser);

userRouter.post('/uploadprofilepic', Authentication, uploadMiddleware.single("profilepic"), uploadProfilePicture);

userRouter.post("/upload", uploadDocs, createIpDocument);
userRouter.get("/download", readIpDocument);
module.exports = userRouter