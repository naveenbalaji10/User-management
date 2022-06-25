const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    profileImage:{
        type:String
    },
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:"user already taken"
    },  
    experience:{
        type:String,
       
    },
    working:{
        type:Boolean
    },
    date:{
        type:Date,
        default:Date.now
    }
  
})

module.exports=mongoose.model('User',userSchema)