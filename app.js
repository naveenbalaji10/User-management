const express =require('express')
const app=express()
const mongoose=require('mongoose')
const bodyparser=require('body-parser')
const postRoute=require('./routes/user')
const cors=require('cors')
require('dotenv/config')
app.use(bodyparser.json())
app.use(cors())
app.use('/public', express.static('public'));
//Routes
app.use('/post',postRoute)


mongoose.connect(process.env.DB,{useNewUrlParser:true},()=>console.log( 'mongodb connected'))

app.listen(3001,()=>console.log('connected to the 3001'))

