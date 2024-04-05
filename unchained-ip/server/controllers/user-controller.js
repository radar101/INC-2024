const User = require('../models/userModels.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Blockchain = require('./blockchain-controller.js');
const  uploadFileOnIpfs = require('../controllers/ipfsUploads.js');
const { single } = require('../middlewares/uploadImageMiddleware.js');

const blockchain = new Blockchain();

//@desc User register
//@route GET /api/user/register
//@access public
const userResister = async (req, res) => {


    const { name, phone, email, password } = req.body;



    if (!name || !phone || !email || !password) {
        return res.status(400).send("Enter the data first");
    }

    const obj = await User.findOne({ email });

    if (obj) {
        return res.status(409).send("User has resgistrerd already ");
    }
    try {
        const newUser = await new User({ name, email, phone, password });
        await User.create(newUser);
        res.status(200).send("User rigistered successfully");
    }
    catch {
        console.log(err);
        res.status(500).send("internal server error");
    }
}


//@desc User Login
//@route GET /api/user/login
//@access public
const userLogin = async (req, res) => {

    const { email, password } = req.body;

    console.log(req.body)

    if (!email || !password) {
        return res.status(400).json({ message: "Enter the data first " });
    }
    const us = await User.findOne({ email })

    if (us) {


        const isMatch = await bcrypt.compare(password, us.password);

        if (!isMatch) {
            return res.status(401).send("Incorrect password")
        }



        const token = await us.generateAuthToken()



        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });




        (token) ? res.status(200).send({
            message: "login success", jwtoken: token
        }).status(200) : res.status(500).json({ message: "Internal server error" });



    } else {
        res.status(404).send({ message: "User not found please register first" })

    }

}


//@desc User Logout
//@route GET /api/user/logout
//@access authorized
const userLogout = async (req, res) => {
    try {
        res.cookie('jwtoken', '', { maxAge: 1 });
        res.status(200).json({ message: "Token deleted" });
    }
    catch (err) {
        res.status(500).json({ mess: "Internal server error" })
    }
}

//@desc User information
//@route GET /api/user/getuser
//@access private
const getUser = async (req, res) => {
    const user = await User.findOne({ _id: req.rootuser._id })
    res.status(200).send(user);
}

//@desc User profile updation
//@route GET /api/user/updateprofile
//@access authorized
const userProfileUpdate = async (req, res) => {
    const userId = req.rootuser._id;

    const { name, email, phone } = req.body;
    await User.findOneAndUpdate({ _id: userId }, { $set: { name, email, phone, created_at: new Date() } })
        .then((user) => {
            console.log(user);
            res.status(200).send(user);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("internal server error");

        })
}


const uploadProfilePicture = async (req, res) => {
    const userId = req.rootuser._id;


    const profilepic = req.file.filename;


    User.findOneAndUpdate({ _id: userId }, { $set: { profilepic } })
        .then((resp) => {
            res.status(200).send("profile picture uploaded successfully");

        })
        .catch((e) => {
            res.status(500).send("internal server error");
        })
}

// Blockchain api
// newTitle, newIpType, newDescription, stnewProofs, stnewLinks,
// newExtrainfo, newLicenseType, newOwnerName, newOwnerProofType, 
// newOwnerProofIdentifier, newOwnerDigitalSign
const createIpDocument = async (req, res) => {
    try {
        console.log("called")
        // userInput validatefirst (left)
        let {newTitle, newIpType, newDescription, newExtraInfo, newLinks, newLicenseType, newOwnerName, newOwnerProofIdentifier} = req.body;

  
        if(newExtraInfo == null && newLicenseType == null) {
            newExtraInfo = ""
            newLicenseType = ""
        }
        else if(newExtraInfo == null) {
            newExtraInfo = "";
        }else if(newLicenseType == null) {
            newLicenseType = ""
        } else if(newTitle == null || newIpType == null || newDescription == null || newOwnerName == null || newOwnerProofIdentifier == null) {
            return res.status(401).json({"msg" : "Please enter the required fields"});
        }
        
        // upload file on IPFS
      
        const signDoc = req.files[0].originalname;;
        const newOwnerDigitalSign = await uploadFileOnIpfs(signDoc);
        
        // console.log("------string: -----", newOwnerDigitalSign, "--------------");
        
         const newProofs = [];
        for(var i = 1; i<req.files.length; i++){
           
            
            const newElement = await uploadFileOnIpfs(req.files[i].originalname);
            newProofs.push(newElement);
        }
    

        const newLink = ['www.youtube.com','www.facebook.com'];
        newLink.push(newLinks);
        newLinks=newLink;
        const id = await blockchain.addIpRecordToContract(newTitle, newIpType, newProofs, newDescription, newLinks, newExtraInfo, newLicenseType, newOwnerName, newOwnerProofIdentifier, newOwnerDigitalSign)
        
        console.log(id);

        if(id)
           {
            const userId  = req.rootuser._id;
            const user = await User.findOneAndUpdate({_id : userId}, {$push : {userIP : id}});
           }
           res.json({message:"Item Added to blocchain",data:id});

        // TODO: Delete file from server

       

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, err });
    }
}


const readIpDocument = async (req, res) => {
    try {
        // userInput validatefirst (left)
        const newIpId = req.query.id;
        //console.log('++++++++++newIpdID is: ',newIpId,'+++++++')
        //     // upload file on IPFS 
        //     const filename = req.file?.originalname;
        //     // get cid 
        //     const cid = await  uploadFileOnIpfs(filename);
        //     console.log(cid);

        //     //call function // pass the required data;

        const record = await blockchain.readIpRecordToContract(newIpId);
        //console.log('################',record,'################');
        res.json({ record });
        //    if(id)
        //    {
        //         // store it in mongo database user profile 
        //         // need to change the schem 
        //    }

    }
    catch (err) {
        res.status(500).json({ message: err.message, err });
    }
}

const createWillDocument = async (req,res) => {
    try{
        //taking required fields
        const {newExecutorName,
            newExecutorIdProof,
            newTestatorName,
            newTestatorIdProof,
            newWitnessName,
            newWitnessIdProof,} = req.body;

            //null checking
        if(newExecutorName == null ||
            newExecutorIdProof == null ||
            newTestatorName == null ||
            newTestatorIdProof == null ||
            newWitnessName == null ||
            newWitnessIdProof == null 
            ){
               return res.status(401).json({"msg" : "Please enter the required fields"});
        }

        //upload data on ipfs
        const useWillDoc = req.files[0].originalname;
        const newDocument = await uploadFileOnIpfs(useWillDoc);

        const useExecutorDigitalSign =req.files[1].originalname;
        const newExecutorDigitalSign = await uploadFileOnIpfs(useExecutorDigitalSign);

        const useTestatorDigitalSign = req.files[2].originalname;
        const newTestatorDigitalSign = await uploadFileOnIpfs(useTestatorDigitalSign);

        const useWitnessDigitalSign = req.files[3].originalname;
        const newWitnessDigitalSign = await uploadFileOnIpfs(useWitnessDigitalSign);

        const id = await blockchain.addWillRecordToContract(newExecutorName,
            newExecutorIdProof,
            newExecutorDigitalSign,
            newTestatorName,
            newTestatorIdProof,
            newTestatorDigitalSign,
            newWitnessName,
            newWitnessIdProof,
            newWitnessDigitalSign,
            newDocument,)
        //    console.log(id);
       
        if(id)
        {
         const userId  = req.rootuser._id;
         const user = await User.findOneAndUpdate({_id : userId}, {$push : {userWill : id}});
        }
        res.json({message:"Item Added to blocchain",data:id});

      

        }catch(error){
            console.log(error);
            res.status(500).json({ message: error.message, error });
        }
    }


    const readWillDocument = async (req, res) => {
        try {
            
            const newWillId = req.query.id;
    
            const record = await blockchain.readWillRecordToContract(newWillId);
            
            res.json({ record });
            
    
        }
        catch (err) {
            res.status(500).json({ message: err.message, err });
        }
    }



const retriveData = async () => {

    // from the cid and ...
    //retrive the data from the blockchain 

    // return the data to the user 
}

module.exports = { getUser, userResister, userLogin, userLogout, userProfileUpdate, uploadProfilePicture, retriveData, createIpDocument, readIpDocument, createWillDocument, readWillDocument }