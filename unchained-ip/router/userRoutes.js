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
    readIpDocument,
    createWillDocument,
    readWillDocument
} = require('../controllers/user-controller.js');
const uploadMiddleware = require("../middlewares/uploadImageMiddleware.js");
const { uploadDocs, uploadWillDocs } = require("../middlewares/multers3.js");


userRouter.post('/register', userResister);

userRouter.post('/login', userLogin);

userRouter.put('/updateprofile', Authentication, userProfileUpdate);

userRouter.get('/logout', Authentication, userLogout);

userRouter.get('/getuser', Authentication, getUser);

userRouter.post('/uploadprofilepic', Authentication, uploadMiddleware.single("profilepic"), uploadProfilePicture);

userRouter.post("/upload", Authentication,uploadDocs, createIpDocument);

userRouter.get("/readip",readIpDocument)    

userRouter.get("/download", readIpDocument);

userRouter.post("/uploadWill", Authentication,uploadWillDocs, createWillDocument);

userRouter.get("/readwill", readWillDocument);

module.exports = userRouter