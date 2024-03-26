const userModel = require('../models/users')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

//create user
const creatUser = async(req, res, next)=>{
    try{ 
     let user = req.body;
     let inserteduser = await  userModel.create(user)
     res.status(201).json({massege:`user created succsesfuly`, data : inserteduser})
    }catch(err){
     next(err)
 
    }
 
 }
 
 //getallsellers
 const getallUsers =async(req,res)=>{
   try{
     let allusers = await userModel.find();
     res.status(200).json({massege: "succes", data : allusers})
 
   }catch(err){
    res.status(500).json({massege: err})
   }
 
 
 }
 
 //getsellerbyid
 const getuserbyid =async(req,res)=>{
    let {id} = req.params
     try{
      let user =await userModel.findById(id ).exec();
     
      if(user){
         res.status(200).json({masseg: "success", data: user})
      }else{
       res.status(400).json({"masseg" : `user does't exasit`})}
 
    }catch(err){
     res.status(500).json({"masseg" : `try again later`})
    }
 
 
 }
 
 
 //updateseller
 const updateusre= async (req,res)=>{
    let {id} = req.params
    let {name} = req.body
    try{
 
    let updateduser = await userModel.findByIdAndUpdate(id, {name}, { new: true})
    res.status(200).json({"masseg" : `user was update sucsesfuly` , data : updateduser})
    }catch(err){
     res.status(422).json({"masseg" : err.masseg}) 
    }
 
 }
 
 //deletseller
 
 const deleteUser = async(req,res)=>{
 let {id} = req.params
 try {
     const deleteduser = await userModel.findByIdAndDelete(id);
 
     if (deleteduser) {
       res.status(200).json({ "message": `user deleted successfully` });
     } else {
       
       res.status(404).json({ "message": `user not found with ID: ${id}` });
     }
   }catch(error) {
     res.status(422).json({ "message": error.message });
   }
 
 
 }

///login

const login = async(request, response)=>{
  let {email , password} = request.body
   
  if(!email || !password){
  return response.status(400).json({masseg :'you must provide email and password'})
   }
  let user = await userModel.findOne({email:email})
    if(!user){
     return response.status(404).json({masseg :'invalid  email or password'})
   
    }

    let isvalid = await bcrypt.compare(password,user.password)

    if(!isvalid){
     return response.status(401).json({masseg :'invalid  email or password'})
   
    }

 let token =  await  jwt.sign({data : {email : user.email, id: user._id, role : user.role}}, process.env.JWT_SECRET   ,{expiresIn: '1h'})

     response.status(200).json({masseg : "success" , token: token})
   }
   
 
 
 
 module.exports ={deleteUser,updateusre, getallUsers, creatUser,getuserbyid ,login}