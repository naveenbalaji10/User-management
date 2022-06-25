const express=require('express')
const router=express.Router()
const User=require('../models/userModel')
const multer=require('multer')
const { v4: uuidv4 } = require('uuid');



const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});

let upload = multer({ storage:storage });


router.get('/',async(req,res)=>{
    try {
        const users=await User.find({}).sort({date:-1})
        res.json(users)
    } catch (error) {
        res.status(500).json({message:"cant get users"})
    }
})

router.post('/',upload.single('profileImage'),async(req,res)=>{
    const url = req.protocol + '://' + req.get('host')
    const {name,experience,email ,working} = req.body;
    const profileImage=url + '/public/' + req.file.filename
    console.log(profileImage)
 try {
    const user = await new User({
        profileImage,
        name,
        email,
        experience,
        working
    })
   await user.save().then(()=>{
        res.json('saved')
 } )
}catch (error) {
    console.log(error)
 }
})



router.delete('/:id',async(req,res)=>{
    try {
     const user=await User.findOneAndDelete({_id:req.params.id})
     res.send("removed")
    } catch (error) {
        res.status(500).json({message:error})
    }
})

router.put('/:id',upload.single('profileImage'), async(req,res)=>{
   const { name, email,working, experience } = req.body;
   const profileImage=req.file.originalname;
  const userFields = {};
  if (name) userFields.name = name;
  if (email) userFields.email = email;
  if (profileImage) userFields.profileImage = profileImage;
  if(working) userFields.working=working;
  if (experience) userFields.experience = experience;

  try {
    let user = await User.findById(req.params.id);
    //check contact exists
    if (!user) {
      return res.status(404).json({ msg: "contact not found" });
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: userFields,
      },
      { new: true }
    );
    res.json(user);
}catch(err){
    res.status(500).json({message:"error"})
}
})

module.exports=router