
import mongoose from "mongoose";
import bcrypt   from 'bcrypt';
import jwt      from 'jsonwebtoken';
const userSchema = mongoose.Schema(
  {
    
    name: {
      type: String,
      required: [true, "Please enter user name "],
    },
    email: {
      type: String,
      required: [true, "Please enter user email"],
    },
    phone:{
        type :String,
        required:[true,"Please enter user phone number"]
    },
    password:{
        type:String,
        required:[true,"Please enter user password"]
    },
    
   
  },
   {
    timestamps: true,
  }
);




userSchema.methods.generateAuthToken  = async function(){
    try{  
    
           let token =jwt.sign({user: this, role:"user"}, process.env.JWT_PASS);
          
           return token
           
    }catch(err){
         console.log(err);
    }
}


userSchema.pre('save',async function(next){
    if(this.isModified('password')){
         this.password=await bcrypt.hash(this.password,12)
    }
    next();
 })

export default mongoose.model('User',userSchema);
